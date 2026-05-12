import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
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
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error('Google Sheets error:', error)
      }
    }

    // Send email notification
    const emailTo = 'veronicamendonca2113@gmail.com'
    
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
            subject: `New Contact Message: ${subject}`,
            html: `
              <h2>New Contact Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <hr>
              <p><small>Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
            `,
          }),
        })
      } catch (error) {
        console.error('Email error:', error)
      }
    }

    // Log the submission for tracking
    console.log('Contact form submitted:', {
      name,
      email,
      subject,
      message,
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
