'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "Absolutely love the service! My gel extensions look flawless, and they last so long. Highly recommend!",
    author: "Riya Mehta",
  },
  {
    quote: "The attention to detail is amazing, and Veronica is super professional. Got the best nail art done here!",
    author: "Ananya Shah",
  },
  {
    quote: "I've tried many nail artists, but the quality of service here is unmatched. The nail work is skilled and very detail-oriented!",
    author: "Neha Kapoor",
  },
  {
    quote: "From manicures to extensions, everything is perfect! My nails have never looked better. Definitely my go-to!",
    author: "Pooja Agarwal",
  },
  {
    quote: "Nails by Veronica never disappoints! Premium quality products are used, and my nails always look stunning.",
    author: "Simran Verma",
  },
  {
    quote: "Amazing experience! The hygiene, the colors, and the designs - everything is top-notch. Will visit again soon!",
    author: "Sanya Iyer",
  },
  {
    quote: "The gel polish stays intact for weeks! Super happy with the service and professionalism.",
    author: "Tanya Joshi",
  },
  {
    quote: "Love the creative nail art offered! Every session feels like a pampering experience, and Veronica is so friendly!",
    author: "Mitali Desai",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const visibleTestimonials = 3
  const maxIndex = testimonials.length - visibleTestimonials

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium mb-2">Testimonials</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            What People Are Saying
          </h2>
          <p className="text-muted-foreground">
            Hear from our happy clients who love their nail transformations
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-background rounded-full shadow-lg hover:bg-secondary transition-colors hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-background rounded-full shadow-lg hover:bg-secondary transition-colors hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleTestimonials)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary/20 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-foreground/80 italic mb-6 leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <p className="font-semibold text-foreground">
                        - {testimonial.author}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
