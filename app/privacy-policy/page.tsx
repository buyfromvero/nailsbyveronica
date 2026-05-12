import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Nails by Veronica',
  description: 'Privacy Policy for Nails by Veronica - How we collect, use, and protect your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: May 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-neutral">
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy describes how Nails by Veronica (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) 
              collects, uses, and discloses your information when you use our services and website.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Interpretation and Definitions
            </h2>
            <h3 className="font-semibold text-foreground mt-6 mb-2">Interpretation</h3>
            <p className="text-muted-foreground leading-relaxed">
              The words of which the initial letter is capitalized have meanings defined under the 
              following conditions. The following definitions shall have the same meaning regardless 
              of whether they appear in singular or in plural.
            </p>

            <h3 className="font-semibold text-foreground mt-6 mb-2">Definitions</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
              <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Nails by Veronica, operated by Veronica Mendonca, Mumbai, Maharashtra, India.</li>
              <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website.</li>
              <li><strong>Country</strong> refers to: Maharashtra, India</li>
              <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
              <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
              <li><strong>Service</strong> refers to the Website.</li>
              <li><strong>Website</strong> refers to Nails by Veronica.</li>
              <li><strong>You</strong> means the individual accessing or using the Service.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Collecting and Using Your Personal Data
            </h2>
            <h3 className="font-semibold text-foreground mt-6 mb-2">Types of Data Collected</h3>
            <h4 className="font-medium text-foreground mt-4 mb-2">Personal Data</h4>
            <p className="text-muted-foreground leading-relaxed">
              While using Our Service, We may ask You to provide Us with certain personally 
              identifiable information that can be used to contact or identify You. Personally 
              identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Usage Data</li>
            </ul>

            <h4 className="font-medium text-foreground mt-4 mb-2">Usage Data</h4>
            <p className="text-muted-foreground leading-relaxed">
              Usage Data is collected automatically when using the Service. Usage Data may include 
              information such as Your Device&apos;s Internet Protocol address (e.g. IP address), browser 
              type, browser version, the pages of our Service that You visit, the time and date of 
              Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Use of Your Personal Data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Company may use Personal Data for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
              <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
              <li><strong>To contact You:</strong> To contact You by email regarding updates or informative communications related to appointments and services.</li>
              <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Retention of Your Personal Data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Company will retain Your Personal Data only for as long as is necessary for the 
              purposes set out in this Privacy Policy. We will retain and use Your Personal Data to 
              the extent necessary to comply with our legal obligations, resolve disputes, and enforce 
              our legal agreements and policies.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Security of Your Personal Data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The security of Your Personal Data is important to Us, but remember that no method of 
              transmission over the Internet, or method of electronic storage is 100% secure. While 
              We strive to use commercially acceptable means to protect Your Personal Data, We cannot 
              guarantee its absolute security.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service does not address anyone under the age of 13. We do not knowingly collect 
              personally identifiable information from anyone under the age of 13. If You are a parent 
              or guardian and You are aware that Your child has provided Us with Personal Data, please 
              contact Us.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Changes to this Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update Our Privacy Policy from time to time. We will notify You of any changes 
              by posting the new Privacy Policy on this page. You are advised to review this Privacy 
              Policy periodically for any changes.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, You can contact us:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>By email: veronicamendonca2113@gmail.com</li>
              <li>On Instagram: @nails_by__veronica</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
