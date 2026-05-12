import { CheckCircle } from 'lucide-react'

const features = [
  'Customized Designs - From elegant French tips to dazzling 3D nail art, I create unique styles tailored to your personality.',
  'Long-Lasting Brilliance - Premium gel polishes and advanced techniques ensure a glossy, chip-free finish that lasts for weeks.',
  'Hygiene First - All tools are properly sanitized and sterilized for your safety.',
  'Personal Attention - One-on-one sessions ensuring you get the best experience.',
]

export function AboutSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-medium mb-2">About Nails by Veronica</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Skilled Nail Art for the Modern Woman
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At Nails by Veronica, I bring out the best in your nails with expert precision 
              and artistic flair. Whether you love a classic, glossy finish or bold, 
              intricate designs, every nail is a masterpiece. Serving ladies across Mumbai, 
              I provide personalized nail care services at your convenience.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground/80 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square bg-primary/10 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <rect x="14" y="4" width="12" height="6" rx="1" fill="currentColor" opacity="0.8" />
                      <rect x="16" y="2" width="8" height="4" rx="1" fill="currentColor" />
                      <path
                        d="M12 10C12 10 10 12 10 20C10 28 12 34 20 36C28 34 30 28 30 20C30 12 28 10 28 10H12Z"
                        fill="currentColor"
                      />
                      <ellipse cx="16" cy="20" rx="2" ry="6" fill="white" opacity="0.3" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Elegance in Every Stroke
                  </h3>
                  <p className="text-muted-foreground">
                    Confidence in Every Shade
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
