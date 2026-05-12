import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { validateContactForm, sanitizeInput } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 requests per minute per IP
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`contact:${clientIP}`, {
      interval: 60000,
      maxRequests: 5,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      )
    }

    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Server-side validation
    const validation = validateContactForm({
      name,
      email,
      phone,
      subject,
      message,
    })

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: email.toLowerCase().trim(),
      phone: phone?.replace(/\s/g, '') || '',
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    }

    // Send to Google Sheets (if configured)
    const googleSheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (googleSheetWebhook) {
      try {
        await fetch(googleSheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'contact',
            ...sanitizedData,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error('Google Sheets error:', error)
      }
    }

    // Send email notification
    const emailTo = 'nailsbyveronica5@gmail.com'
    
    // If you have Resend or other email service configured
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Nails by Veronica <onboarding@resend.dev>',
            to: [emailTo],
            subject: `New Contact Message: ${sanitizedData.subject}`,
            html: `
              <h2>New Contact Message</h2>
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
              <p><strong>Message:</strong></p>
              <p>${sanitizedData.message}</p>
              <hr>
              <p><small>Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
            `,
          }),
        })
      } catch (error) {
        console.error('Email error:', error)
      }
    }

    // Log the submission for tracking (sanitized)
    console.log('Contact form submitted:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
