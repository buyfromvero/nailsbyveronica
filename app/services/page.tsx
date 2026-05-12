import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clock, Sparkles, Heart, Star, Palette, Gem } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services | Nails by Veronica',
  description: 'Explore our premium nail services including gel extensions, acrylic extensions, nail art, manicure, pedicure and more.',
}

const serviceCategories = [
  {
    id: 'gel-extensions',
    icon: Sparkles,
    title: 'Gel Extensions + Gel Polish',
    description: 'Beautiful, natural-looking nail extensions with premium gel polish for a flawless finish.',
    price: '1800',
    duration: '75 minutes',
    features: ['Natural look', 'Long-lasting', 'Flexible & strong', 'Wide color range'],
  },
  {
    id: 'acrylic-extensions',
    icon: Gem,
    title: 'Acrylic Extensions + Gel Polish',
    description: 'Durable acrylic extensions perfect for those who want extra strength and length.',
    price: '1800',
    duration: '75 minutes',
    features: ['Extra durable', 'Customizable length', 'Strong finish', 'Premium polish'],
  },
  {
    id: 'gel-polish',
    icon: Palette,
    title: 'Hands & Feet Gel Polish',
    description: 'Premium gel polish application for a glossy, chip-free finish that lasts weeks.',
    price: '699',
    duration: '30 minutes',
    features: ['Chip-resistant', '2-3 weeks lasting', 'Glossy finish', 'Quick dry'],
  },
  {
    id: 'nail-art',
    icon: Star,
    title: 'Nail Art & Designs',
    description: 'Express yourself with custom nail art from subtle elegance to bold statement designs.',
    price: 'Starting ₹60',
    duration: 'Varies',
    features: ['Custom designs', '3D art available', 'Chrome & glitter', 'Hand-painted art'],
  },
  {
    id: 'manicure-pedicure',
    icon: Heart,
    title: 'Manicure & Pedicure',
    description: 'Complete hand and foot care with cleaning, shaping, and polish application.',
    price: '1199',
    duration: '50 minutes',
    features: ['Nail shaping', 'Cuticle care', 'Moisturizing', 'Polish included'],
  },
]

const handsAndFeetServices = [
  { name: 'Acrylic Extensions + Gel Polish', price: '1800', duration: '75 minutes' },
  { name: 'Gel Extensions + Gel Polish', price: '1800', duration: '75 minutes' },
  { name: 'Hands Gel Polish', price: '699', duration: '30 minutes' },
  { name: 'Feet Gel Polish', price: '699', duration: '30 minutes' },
  { name: 'Temporary Nails + Gel Polish', price: '1199', duration: '50 minutes' },
  { name: 'Overlays + Gel Polish', price: '1499', duration: '60 minutes' },
  { name: 'Refills + Gel Polish', price: '1499', duration: '60 minutes' },
  { name: 'Manicure & Pedicure', price: '1199', duration: '50 minutes' },
  { name: 'Removals', price: '499', duration: '50 minutes' },
]

const addOnServices = [
  { name: 'Glitter polish on full nail', price: '30', note: 'per finger' },
  { name: 'Glitter French', price: '60', note: 'per finger' },
  { name: 'Glitter Ombre', price: '60', note: 'per finger' },
  { name: 'French Chrome', price: '80', note: 'per finger' },
  { name: 'Brush Art', price: '100', note: 'starting rate per finger' },
  { name: '3D Art', price: '150', note: 'starting rate per finger' },
  { name: 'Chrome + French', price: '90', note: '20-30 minutes' },
  { name: 'Swirls Light', price: '60', note: '25-30 minutes' },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From classic elegance to bold statements, discover our range of premium nail services. 
              Every service is performed with expert precision and the finest quality products.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service) => (
              <Card key={service.id} id={service.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-center gap-4 mb-4 text-sm">
                    <span className="font-serif text-2xl font-bold text-primary">
                      {service.price.startsWith('Starting') ? service.price : `₹${service.price}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <ul className="text-left space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/appointment">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Full Price List */}
      <section className="py-16 bg-secondary/30" id="add-ons">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center text-foreground mb-12">
            Complete Price List
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Hands & Feet */}
            <Card className="shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="font-serif text-2xl text-center">Hands & Feet</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {handsAndFeetServices.map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">{service.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {service.duration}
                        </p>
                      </div>
                      <p className="font-serif text-xl font-bold text-primary">
                        ₹{service.price}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add-On Services */}
            <Card className="shadow-lg">
              <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
                <CardTitle className="font-serif text-2xl text-center">Add-On Services</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {addOnServices.map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">{service.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.note}
                        </p>
                      </div>
                      <p className="font-serif text-xl font-bold text-primary">
                        ₹{service.price}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to Transform Your Nails?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Book your appointment today and experience premium nail care services.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/appointment">Book Your Appointment</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
