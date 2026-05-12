import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Palette, Heart, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Sparkles,
    title: 'Nail Care',
    description: 'Expert nail care: Extensions, gel polish, manicures, pedicures, and art',
    href: '/services#nail-care',
  },
  {
    icon: Palette,
    title: 'Nail Art',
    description: 'Trendy, long-lasting nail art with premium designs for perfect nails',
    href: '/services#nail-art',
  },
  {
    icon: Heart,
    title: 'Add-Ons',
    description: 'Discover premium services like extensions, overlays, and spa treatments',
    href: '/services#add-ons',
  },
]

export function ServicesPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground">
            From classic elegance to bold statements, discover our range of premium nail services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card 
              key={service.title}
              className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link 
                  href={service.href}
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
