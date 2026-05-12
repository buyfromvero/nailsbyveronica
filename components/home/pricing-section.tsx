import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'

const handsAndFeet = [
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

const addOns = [
  { name: 'Glitter polish on full nail', price: '30', note: 'per finger' },
  { name: 'Glitter French', price: '60', note: 'per finger' },
  { name: 'Glitter Ombre', price: '60', note: 'per finger' },
  { name: 'French Chrome', price: '80', note: 'per finger' },
  { name: 'Brush Art', price: '100', note: 'starting rate per finger' },
  { name: '3D Art', price: '150', note: 'starting rate per finger' },
  { name: 'Chrome + French', price: '90', duration: '20-30 minutes' },
  { name: 'Swirls Light', price: '60', duration: '25-30 minutes' },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium mb-2">Fresh, Shiny, Bright</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Make Your Day Shine with Your Shiny Nails
          </h2>
          <p className="text-muted-foreground">
            Premium services at competitive prices. All prices are in INR.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Hands & Feet */}
          <Card className="shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="font-serif text-2xl text-center">Hands & Feet</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {handsAndFeet.map((service) => (
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
                {addOns.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div>
                      <h4 className="font-medium text-foreground">{service.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.note || service.duration}
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

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/services">View Full Price List</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
