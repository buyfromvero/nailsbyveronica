import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { validateAppointmentForm, sanitizeInput } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 requests per minute per IP
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`appointment:${clientIP}`, {
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
    const { name, email, phone, service, date, time, message } = body

    // Server-side validation
    const validation = validateAppointmentForm({
      name,
      email,
      phone,
      service,
      date,
      time,
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
      phone: phone?.replace(/\s/g, ''),
      service: sanitizeInput(service),
      date: sanitizeInput(date),
      time: sanitizeInput(time),
      message: message ? sanitizeInput(message) : '',
    }

    // Send to Google Sheets (if configured)
    const googleSheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (googleSheetWebhook) {
      try {
        await fetch(googleSheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'appointment',
            ...sanitizedData,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error('Google Sheets error:', error)
      }
    }

    // Send email notification (using a simple email service or Gmail API)
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
            subject: `New Appointment Request from ${sanitizedData.name}`,
            html: `
              <h2>New Appointment Request</h2>
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
              <p><strong>Service:</strong> ${sanitizedData.service}</p>
              <p><strong>Preferred Date:</strong> ${sanitizedData.date}</p>
              <p><strong>Preferred Time:</strong> ${sanitizedData.time}</p>
              <p><strong>Additional Notes:</strong> ${sanitizedData.message || 'None'}</p>
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
    console.log('Appointment request received:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      service: sanitizedData.service,
      date: sanitizedData.date,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Appointment request submitted successfully' 
    })
  } catch (error) {
    console.error('Appointment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit appointment request' },
      { status: 500 }
    )
  }
}
