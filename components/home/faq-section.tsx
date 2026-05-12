'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQSchema } from '@/components/structured-data'

const faqs = [
  {
    question: 'How long do gel extensions last?',
    answer: 'Gel extensions typically last 3-4 weeks with proper care. You may need infills every 2-3 weeks as your natural nails grow out. Following aftercare instructions helps maximize longevity.',
  },
  {
    question: 'What is the difference between gel and acrylic nails?',
    answer: 'Gel nails are more flexible and natural-looking, while acrylic nails are harder and more durable. Gel nails cure under UV/LED light, while acrylics air-dry. Both options look beautiful - the choice depends on your lifestyle and preference.',
  },
  {
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through our website by filling out the appointment form, or contact us directly via WhatsApp or phone. We will confirm your appointment within 24 hours.',
  },
  {
    question: 'Do you use safe and hygienic products?',
    answer: 'Absolutely! We use only premium, salon-grade products from trusted brands. All tools are properly sanitized between clients, and we follow strict hygiene protocols to ensure your safety.',
  },
  {
    question: 'Can I get nail art on natural nails?',
    answer: 'Yes! We offer nail art on natural nails with regular or gel polish. However, for intricate designs or longer nail art, extensions provide a better canvas and longer-lasting results.',
  },
  {
    question: 'What should I do to prepare for my appointment?',
    answer: 'Please arrive with clean, polish-free nails if possible. Avoid applying hand cream right before your appointment as it can affect adhesion. Let us know about any nail concerns or allergies beforehand.',
  },
  {
    question: 'How much do services cost?',
    answer: 'Our prices vary depending on the service and complexity. Basic gel polish starts from Rs. 800, while extensions and nail art are priced based on design complexity. Check our Services page for detailed pricing.',
  },
  {
    question: 'Do you offer home service?',
    answer: 'Currently, we operate from our studio location. Home service may be available for bridal packages or special occasions - please contact us to discuss your requirements.',
  },
]

export function FAQSection() {
  return (
    <section className="py-16 md:py-24">
      <FAQSchema faqs={faqs} />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-medium mb-2">FAQ</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our nail services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg border px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
