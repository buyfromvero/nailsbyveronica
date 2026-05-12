import Link from 'next/link'
import { Logo } from './logo'
import { Mail, Instagram, MapPin, Clock } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Book Appointment', href: '/appointment' },
  { name: 'Contact', href: '/contact' },
]

const services = [
  { name: 'Gel Extensions', href: '/services#gel-extensions' },
  { name: 'Acrylic Extensions', href: '/services#acrylic-extensions' },
  { name: 'Nail Art', href: '/services#nail-art' },
  { name: 'Manicure & Pedicure', href: '/services#manicure-pedicure' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg
                  width="40"
                  height="40"
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
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wide text-background/90 leading-tight">
                  Nails by
                </span>
                <span className="font-serif text-xl font-bold text-primary leading-tight -mt-1">
                  Veronica
                </span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Transform your nails into works of art. Expert nail care, stunning designs, 
              and premium services for ladies across Mumbai.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/nails_by__veronica"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 rounded-full hover:bg-primary hover:text-foreground transition-colors"
                aria-label="Follow on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:veronicamendonca2113@gmail.com"
                className="p-2 bg-background/10 rounded-full hover:bg-primary hover:text-foreground transition-colors"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a
                  href="mailto:veronicamendonca2113@gmail.com"
                  className="text-background/70 hover:text-primary transition-colors text-sm break-all"
                >
                  veronicamendonca2113@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a
                  href="https://instagram.com/nails_by__veronica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  @nails_by__veronica
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  By Appointment Only
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              &copy; {new Date().getFullYear()} Nails by Veronica. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-background/60 hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-center text-background/40 text-xs mt-4">
            Code & Crafted with 💛 by Dr Anonymous
          </p>
        </div>
      </div>
    </footer>
  )
}
