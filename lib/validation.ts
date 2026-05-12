// Server-side validation utilities

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Indian phone number format (10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>"'&]/g, (char) => {
      // Escape special characters
      const escapeMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      }
      return escapeMap[char] || char
    })
}

export function validateAppointmentForm(data: {
  name?: string
  email?: string
  phone?: string
  service?: string
  date?: string
  time?: string
  message?: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (data.name.length > 100) {
    errors.name = 'Name must be less than 100 characters'
  }

  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Phone validation
  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number'
  }

  // Service validation
  const validServices = [
    'Gel Extensions + Gel Polish',
    'Acrylic Extensions + Gel Polish',
    'Hands Gel Polish',
    'Feet Gel Polish',
    'Temporary Nails + Gel Polish',
    'Overlays + Gel Polish',
    'Refills + Gel Polish',
    'Manicure & Pedicure',
    'Nail Art',
    'Removals',
    'Other',
  ]
  if (!data.service || !validServices.includes(data.service)) {
    errors.service = 'Please select a valid service'
  }

  // Date validation
  if (!data.date) {
    errors.date = 'Please select a preferred date'
  }

  // Time validation
  if (!data.time) {
    errors.time = 'Please select a preferred time'
  }

  // Message length validation (optional field)
  if (data.message && data.message.length > 1000) {
    errors.message = 'Message must be less than 1000 characters'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateContactForm(data: {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (data.name.length > 100) {
    errors.name = 'Name must be less than 100 characters'
  }

  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Phone validation (optional)
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number'
  }

  // Subject validation
  const validSubjects = [
    'General Inquiry',
    'Appointment Question',
    'Service Information',
    'Pricing',
    'Feedback',
    'Other',
  ]
  if (!data.subject || !validSubjects.includes(data.subject)) {
    errors.subject = 'Please select a valid subject'
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  } else if (data.message.length > 2000) {
    errors.message = 'Message must be less than 2000 characters'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
