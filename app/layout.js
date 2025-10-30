import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'TheWhiteWhale',
  description: 'Official contact portal for TheWhiteWhale',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
