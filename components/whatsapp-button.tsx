'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'

// WhatsApp number - update this with your actual number
const WHATSAPP_NUMBER = '919999999999' // Format: country code + number (no + symbol)
const DEFAULT_MESSAGE = 'Hi! I would like to inquire about nail services at Nails by Veronica.'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Show button after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    // Show tooltip after 3 seconds on first visit
    const tooltipTimer = setTimeout(() => {
      const hasSeenTooltip = sessionStorage.getItem('whatsapp-tooltip-seen')
      if (!hasSeenTooltip) {
        setShowTooltip(true)
        sessionStorage.setItem('whatsapp-tooltip-seen', 'true')
      }
    }, 3000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(tooltipTimer)
    }
  }, [])

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
    setShowTooltip(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative bg-card rounded-lg shadow-lg p-3 pr-8 max-w-[200px] animate-in slide-in-from-right-5 fade-in duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            aria-label="Close tooltip"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm text-foreground">
            Need help? Chat with us on WhatsApp!
          </p>
          {/* Arrow */}
          <div className="absolute right-[-6px] bottom-4 w-3 h-3 bg-card rotate-45 shadow-lg" />
        </div>
      )}

      {/* WhatsApp Button */}
      <Button
        onClick={handleClick}
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </div>
  )
}
