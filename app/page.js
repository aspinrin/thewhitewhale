import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-20">
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        TheWhiteWhale
      </h1>
      
      <p className="text-xl text-gray-400 mb-12">
        Premium crypto insights, Solana expertise, and verified contact access
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="glass rounded-lg p-8 hover:border-blue-500 transition-all">
          <h3 className="text-2xl font-bold mb-4">🐋 About</h3>
          <p className="text-gray-400">
            Top Solana investor, DeFi analyst, and blockchain strategist. 
            Focused on high-conviction plays and community-driven projects.
          </p>
        </div>

        <div className="glass rounded-lg p-8 hover:border-purple-500 transition-all">
          <h3 className="text-2xl font-bold mb-4"> 🐋 </h3>
          <p className="text-gray-400">
            Depth-tested. Market-hardened. 🐋 | $100M PnL goal 🎯 Sharing conviction and philosophy, not financial advice.
          </p>
        </div>
      </div>

      <Link 
        href="/contact"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
      >
        Get In Touch →
      </Link>
    </div>
  )
}
