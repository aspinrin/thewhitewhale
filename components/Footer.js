import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-black py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐋</span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              TheWhiteWhale
            </span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-blue-400 transition-colors">
              Projects
            </Link>
            <Link href="/prices" className="hover:text-blue-400 transition-colors">
              Live Prices
            </Link>
            <Link href="/charity" className="hover:text-blue-400 transition-colors">
              Charity
            </Link>
            <Link href="/mexc" className="hover:text-blue-400 transition-colors">
              Mexc Issue
            </Link>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://x.com/WhiteWhaleLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>Follow @WhiteWhaleLabs</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} TheWhiteWhale. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
