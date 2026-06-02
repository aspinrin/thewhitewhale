import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BouncingWhale from '../components/BouncingWhale'
import { Analytics } from '@vercel/analytics/next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'TheWhiteWhale | Premium Crypto Insights',
  description: 'Official portal for TheWhiteWhale',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="bg-black text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />
        <BouncingWhale />
        <Analytics />
      </body>
    </html>
  )
}
