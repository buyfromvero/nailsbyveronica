'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, CheckCircle, Mail, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call - replace with actual newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubscribed(true)
      toast.success('Thank you for subscribing!')
      setEmail('')
      
      // Reset after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-br from-primary/10 to-secondary/30 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Stay Updated
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Get Nail Care Tips & Exclusive Offers
                </h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter for the latest nail trends, care tips, and special discounts delivered to your inbox.
                </p>
              </div>

              <div className="w-full md:w-auto md:min-w-[320px]">
                {isSubscribed ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="font-medium text-foreground">You&apos;re subscribed!</p>
                    <p className="text-sm text-muted-foreground text-center">
                      Watch your inbox for nail care tips and exclusive offers.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 bg-background"
                        disabled={isLoading}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        'Subscribe Now'
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
