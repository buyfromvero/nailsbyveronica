import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, date, time, message } = body

    // Validate required fields
    if (!name || !email || !service || !date || !time) {
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
            type: 'appointment',
            name,
            email,
            service,
            date,
            time,
            message: message || 'No additional notes',
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error('Google Sheets error:', error)
      }
    }

    // Send email notification (using a simple email service or Gmail API)
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
            subject: `New Appointment Request from ${name}`,
            html: `
              <h2>New Appointment Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Preferred Date:</strong> ${date}</p>
              <p><strong>Preferred Time:</strong> ${time}</p>
              <p><strong>Additional Notes:</strong> ${message || 'None'}</p>
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
    console.log('Appointment request received:', {
      name,
      email,
      service,
      date,
      time,
      message,
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
