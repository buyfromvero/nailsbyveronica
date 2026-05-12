import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Nails by Veronica',
  description: 'Terms and Conditions for Nails by Veronica nail services.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground">
              Last updated: May 30, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-neutral">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Nails by Veronica. By booking an appointment or using our services, 
              you agree to the following terms and conditions. Please read them carefully.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              1. Appointments & Bookings
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Scheduling:</strong> Appointments can be booked online through our website or via direct message on Instagram.</li>
              <li><strong>Late Arrivals:</strong> Clients arriving more than 10 minutes late may experience shorter service time or rescheduling, depending on availability.</li>
              <li><strong>No-shows:</strong> Repeated no-shows may result in denial of future bookings or a deposit requirement.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              2. Cancellations & Rescheduling
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Notice Required:</strong> Please provide at least 24 hours&apos; notice for cancellations or rescheduling.</li>
              <li><strong>Late Cancellations:</strong> Cancellations made less than 24 hours in advance may affect future booking privileges.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              3. Payments
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>We accept cash, UPI, and other digital payment methods.</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>All payments must be made at the time of service.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              4. Services & Satisfaction
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>If you are not satisfied with your service, please inform us within 24 hours so we can address the issue appropriately.</li>
              <li>We do not offer refunds, but we are happy to make reasonable adjustments to ensure client satisfaction.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              5. Health & Safety
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Clients must inform us of any allergies, skin sensitivities, or medical conditions prior to their service.</li>
              <li>We maintain high standards of hygiene and sanitation for all tools and workstations.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              6. Personal Belongings
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nails by Veronica is not responsible for the loss or damage of personal items during your session. 
              Please keep valuables with you at all times.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              7. Service Area
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are available to ladies across Mumbai, Maharashtra, India. 
              For service requests outside this area, please contact us for availability.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              8. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, images, and branding on our website and social media are the property of 
              Nails by Veronica and may not be copied or used without permission.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              9. Policy Updates
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update these terms and conditions at any time without prior notice. 
              The latest version will always be available on our website.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions regarding our Terms and Conditions, please contact us at:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Email: veronicamendonca2113@gmail.com</li>
              <li>Instagram: @nails_by__veronica</li>
              <li>Website: nailsbyveronica.com</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
