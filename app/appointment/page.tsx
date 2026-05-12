import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AppointmentForm } from '@/components/appointment-form'
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book Appointment | Nails by Veronica',
  description: 'Book your nail appointment with Nails by Veronica. Premium nail care services in Mumbai.',
}

const benefits = [
  'Personal one-on-one attention',
  'Premium quality products',
  'Flexible scheduling',
  'Hygiene guaranteed',
]

export default function AppointmentPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Book Your Appointment
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Schedule your personalized nail care session. Fill out the form below 
              and I will get back to you within 24 hours to confirm your appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Why Book With Us?
              </h2>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 space-y-6">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Booking Information
                </h3>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Availability</h4>
                    <p className="text-sm text-muted-foreground">All days by appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Response Time</h4>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Location</h4>
                    <p className="text-sm text-muted-foreground">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 border border-primary/20 rounded-xl">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  Cancellation Policy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Please provide at least 24 hours notice for cancellations or rescheduling. 
                  Late cancellations may affect future bookings. I understand that plans change, 
                  so please communicate as early as possible.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
