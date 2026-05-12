import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          {/* Elegant nail polish bottle shape */}
          <rect x="14" y="4" width="12" height="6" rx="1" fill="currentColor" opacity="0.8" />
          <rect x="16" y="2" width="8" height="4" rx="1" fill="currentColor" />
          <path
            d="M12 10C12 10 10 12 10 20C10 28 12 34 20 36C28 34 30 28 30 20C30 12 28 10 28 10H12Z"
            fill="currentColor"
          />
          {/* Shine effect */}
          <ellipse cx="16" cy="20" rx="2" ry="6" fill="white" opacity="0.3" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold tracking-wide text-foreground leading-tight">
          Nails by
        </span>
        <span className="font-serif text-xl font-bold text-primary leading-tight -mt-1">
          Veronica
        </span>
      </div>
    </Link>
  )
}
