import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import { Mail, Instagram, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact | Nails by Veronica',
  description: 'Get in touch with Nails by Veronica. We are here to help with your nail care needs.',
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'veronicamendonca2113@gmail.com',
    link: 'mailto:veronicamendonca2113@gmail.com',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    value: '@nails_by__veronica',
    link: 'https://instagram.com/nails_by__veronica',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Mumbai, Maharashtra, India',
    link: null,
  },
  {
    icon: Clock,
    title: 'Availability',
    value: 'By Appointment Only',
    link: null,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions or want to book an appointment? 
              Fill out the form below or reach out through any of our contact channels.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="bg-secondary/50 rounded-xl p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      How do I book an appointment?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      You can book through our website or DM us on Instagram. 
                      We will confirm your appointment within 24 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      What is the cancellation policy?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Please provide at least 24 hours notice for cancellations or rescheduling.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Do you provide home service?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, I provide nail services across Mumbai area. 
                      Contact me for more details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
