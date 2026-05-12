import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Instagram } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gallery | Nails by Veronica',
  description: 'View our portfolio of beautiful nail art designs and transformations.',
}

const galleryCategories = [
  { name: 'All', count: 24 },
  { name: 'Gel Extensions', count: 6 },
  { name: 'Nail Art', count: 8 },
  { name: 'French Tips', count: 4 },
  { name: 'Chrome', count: 3 },
  { name: 'Ombre', count: 3 },
]

const galleryItems = [
  { title: 'Classic French Tips', category: 'French Tips', color: 'bg-rose-100' },
  { title: 'Gel Extensions - Nude', category: 'Gel Extensions', color: 'bg-pink-200' },
  { title: 'Floral Nail Art', category: 'Nail Art', color: 'bg-purple-200' },
  { title: 'Chrome Mirror Effect', category: 'Chrome', color: 'bg-amber-200' },
  { title: 'Pink Ombre', category: 'Ombre', color: 'bg-pink-300' },
  { title: 'Minimalist Art', category: 'Nail Art', color: 'bg-slate-200' },
  { title: 'Glitter French', category: 'French Tips', color: 'bg-rose-200' },
  { title: 'Long Gel Extensions', category: 'Gel Extensions', color: 'bg-red-200' },
  { title: '3D Flower Art', category: 'Nail Art', color: 'bg-pink-100' },
  { title: 'Gold Chrome', category: 'Chrome', color: 'bg-yellow-200' },
  { title: 'Sunset Ombre', category: 'Ombre', color: 'bg-orange-200' },
  { title: 'Geometric Art', category: 'Nail Art', color: 'bg-indigo-200' },
  { title: 'Baby Pink Extensions', category: 'Gel Extensions', color: 'bg-pink-100' },
  { title: 'Butterfly Art', category: 'Nail Art', color: 'bg-blue-200' },
  { title: 'White French', category: 'French Tips', color: 'bg-stone-100' },
  { title: 'Rose Gold Chrome', category: 'Chrome', color: 'bg-rose-300' },
  { title: 'Lavender Ombre', category: 'Ombre', color: 'bg-violet-200' },
  { title: 'Abstract Art', category: 'Nail Art', color: 'bg-teal-200' },
  { title: 'Nude Extensions', category: 'Gel Extensions', color: 'bg-amber-100' },
  { title: 'Marble Effect', category: 'Nail Art', color: 'bg-gray-200' },
  { title: 'Glitter Tips', category: 'French Tips', color: 'bg-pink-200' },
  { title: 'Stiletto Extensions', category: 'Gel Extensions', color: 'bg-red-300' },
  { title: 'Heart Art', category: 'Nail Art', color: 'bg-rose-200' },
  { title: 'Coffin Extensions', category: 'Gel Extensions', color: 'bg-purple-100' },
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Gallery
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Browse through our collection of stunning nail art designs and transformations. 
              Every design is crafted with precision and love.
            </p>
            <a 
              href="https://instagram.com/nails_by__veronica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">Follow @nails_by__veronica for more</span>
            </a>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-background border-b sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {galleryCategories.map((category) => (
              <button
                key={category.name}
                className="px-4 py-2 rounded-full text-sm font-medium bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                className={`aspect-square ${item.color} rounded-lg overflow-hidden relative group cursor-pointer`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-foreground/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-foreground/50"
                      >
                        <rect x="14" y="4" width="12" height="6" rx="1" fill="currentColor" opacity="0.8" />
                        <rect x="16" y="2" width="8" height="4" rx="1" fill="currentColor" />
                        <path
                          d="M12 10C12 10 10 12 10 20C10 28 12 34 20 36C28 34 30 28 30 20C30 12 28 10 28 10H12Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-foreground/70 text-xs">{item.title}</p>
                    <p className="text-foreground/50 text-xs">{item.category}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Instagram className="h-6 w-6 text-foreground/70" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Want to see more? Follow us on Instagram!
            </p>
            <Button asChild>
              <a 
                href="https://instagram.com/nails_by__veronica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Follow on Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Love What You See?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Book your appointment today and get your dream nails!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/appointment">Book Appointment</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
