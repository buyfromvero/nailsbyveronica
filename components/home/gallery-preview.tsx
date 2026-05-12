import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Instagram } from 'lucide-react'

const galleryItems = [
  { title: 'Classic Manicure', color: 'bg-pink-200' },
  { title: 'French Tips', color: 'bg-rose-100' },
  { title: 'Gel Extensions', color: 'bg-red-200' },
  { title: '3D Nail Art', color: 'bg-purple-200' },
  { title: 'Chrome Nails', color: 'bg-amber-200' },
  { title: 'Ombre Design', color: 'bg-orange-200' },
]

export function GalleryPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium mb-2">A Brush Of Perfection</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Follow & Share
          </h2>
          <a 
            href="https://instagram.com/nails_by__veronica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-medium">@nails_by__veronica</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className={`aspect-square ${item.color} rounded-lg overflow-hidden relative group cursor-pointer`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-foreground/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
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
                  <p className="font-medium text-foreground/70 text-sm">{item.title}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Instagram className="h-8 w-8 text-foreground/70" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
