import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { ServicesPreview } from '@/components/home/services-preview'
import { AboutSection } from '@/components/home/about-section'
import { PricingSection } from '@/components/home/pricing-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { GalleryPreview } from '@/components/home/gallery-preview'
import { WorkingHoursSection } from '@/components/home/working-hours-section'
import { FAQSection } from '@/components/home/faq-section'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesPreview />
      <AboutSection />
      <PricingSection />
      <TestimonialsSection />
      <GalleryPreview />
      <FAQSection />
      <WorkingHoursSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
    </main>
  )
}
