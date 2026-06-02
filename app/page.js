import Link from 'next/link'

export default function Home() {
  const stats = [
    { label: "PnL Target", value: "$100M 🎯" },
    { label: "Community", value: "24,000+ 🐋" },
    { label: "Charity Donated", value: "$1.5M+ 💚" },
    { label: "Dispute Status", value: "Refunded ⚖️" }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <div className="text-center relative z-10 mb-16">
        <span className="inline-block px-4 py-1.5 bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-6 animate-pulse">
          Solana & DeFi Strategist
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-600 text-transparent bg-clip-text">
            TheWhiteWhale
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Premium crypto insights, market-hardened conviction, and high-conviction ecosystem plays. Depth-tested, blockchain native.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a 
            href="https://x.com/WhiteWhaleLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 text-lg"
          >
            Get In Touch On X
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-900/60 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 font-bold py-4 px-8 rounded-xl transition-all duration-300 text-lg"
          >
            Explore Projects
          </Link>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 relative z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-900/40 backdrop-blur-md border border-gray-850 rounded-2xl p-6 text-center hover:border-gray-700 transition-colors">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Navigation / Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        
        {/* Live Prices Card */}
        <Link href="/prices" className="group block bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-md border border-gray-800 hover:border-emerald-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📈</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 rounded-full group-hover:animate-pulse">Live</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Live Market Data</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Monitor real-time updates for top crypto assets directly from CoinGecko. Check 24-hour swings and total market capitalization.
          </p>
          <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
            View Live Prices &rarr;
          </span>
        </Link>

        {/* Featured Projects Card */}
        <Link href="/projects" className="group block bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-md border border-gray-800 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🚀</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-950/50 text-blue-400 border border-blue-900/50 rounded-full">Ecosystem</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Featured Projects</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Explore key protocols, perps exchanges, wallets, and ecosystem builders backed or followed closely by TheWhiteWhale.
          </p>
          <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
            Browse Projects &rarr;
          </span>
        </Link>

        {/* Charity Card */}
        <Link href="/charity" className="group block bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-md border border-gray-800 hover:border-pink-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/5 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🤝</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-pink-950/50 text-pink-400 border border-pink-900/50 rounded-full">Giving Back</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Charitable Contributions</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Full transparency over more than $1.5M in verifiable on-chain charitable donations supporting key social causes on Base.
          </p>
          <span className="text-xs font-semibold text-pink-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
            Verify Donations &rarr;
          </span>
        </Link>

        {/* MEXC Standoff Card */}
        <Link href="/mexc" className="group block bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-md border border-gray-800 hover:border-red-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">⚖️</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-red-950/50 text-red-400 border border-red-900/50 rounded-full">Resolved</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">The MEXC Dispute</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Read the comprehensive timeline and dossier documenting the $3.1M asset freeze, the public bounty campaign, and its successful resolution.
          </p>
          <span className="text-xs font-semibold text-red-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
            Read Dossier &rarr;
          </span>
        </Link>

      </div>
    </div>
  )
}
