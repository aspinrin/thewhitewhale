'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
    { href: '/mexc', label: 'Mexc Issue' },
    { href: '/projects', label: 'Projects' },
    { href: '/prices', label: 'Live Prices' },
  ]

  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
  <img src="/logo.png" alt="TheWhiteWhale" className="h-10 w-10" />
  <span className="text-2xl font-bold">TheWhiteWhale</span>
</Link>
          
          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-blue-400 transition-colors ${
                  pathname === link.href ? 'text-blue-500' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
