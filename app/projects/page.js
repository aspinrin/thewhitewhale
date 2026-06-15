'use client'

import { useState } from 'react'

const projects = [
  {
    name: "Hyperliquid",
    description: "Leading DEX Trading Platform for perpetuals and spot markets.",
    category: "Perps",
    link: "https://app.hyperliquid.xyz/trade",
    twitter: "https://x.com/HyperliquidX"
  },
  {
    name: "Pacifica",
    description: "Building the next generation of perp exchanges.",
    category: "Perps",
    link: "https://pacifica.fi",
    twitter: "https://x.com/pacifica_fi"
  },
  {
    name: "DefiTuna",
    description: "Solana's most advanced AMM and advanced LP toolkit.",
    category: "DeFi",
    link: "https://defituna.com",
    twitter: "https://x.com/defituna"
  },
  {
    name: "Drift",
    description: "The capital-efficient DeFi platform on Solana.",
    category: "Perps",
    link: "https://app.drift.trade",
    twitter: "https://x.com/DriftProtocol"
  },
  {
    name: "TOSHI",
    description: "Memecoin on Base named after Coinbase co-founder Brian Armstrong's cat.",
    category: "Meme",
    link: "https://www.toshithecat.com",
    twitter: "https://x.com/Toshi_base"
  },
  {
    name: "Pudgy Penguins",
    description: "The adorable, community-focused face of Web3 NFTs and culture 🐧",
    category: "Meme",
    link: "https://pengu.pudgypenguins.com",
    twitter: "https://x.com/pudgypenguins"
  },
  {
    name: "Wasabi Protocol",
    description: "Asset-backed trading app with native yield mechanisms.",
    category: "DeFi",
    link: "https://wasabi.xyz",
    twitter: "https://x.com/wasabi_protocol"
  },
  {
    name: "Aave",
    description: "The most trusted financial lending network. Earn, borrow, save, and swap.",
    category: "DeFi",
    link: "https://aave.com",
    twitter: "https://x.com/Aave"
  },
  {
    name: "Solflare",
    description: "Safe and powerful self-custody wallet built specifically for Solana.",
    category: "Wallets",
    link: "https://solflare.com",
    twitter: "https://x.com/solflare_wallet"
  },
  {
    name: "Rabby Wallet",
    description: "The game-changing browser wallet for Ethereum and all EVM chains.",
    category: "Wallets",
    link: "https://rabby.io",
    twitter: "https://x.com/Rabby_Wallet"
  },
  {
    name: "Adrena",
    description: "Solana Perps DEX. 100x Leverage, 0% Slippage, and 90% Rev Share. Community Owned.",
    category: "Perps",
    link: "https://adrena.trade",
    twitter: "https://x.com/AdrenaProtocol"
  },
  {
    name: "Arculus",
    description: "Arculus® hardware security platform for simple and sleek digital asset protection.",
    category: "Wallets",
    link: "https://www.getarculus.com",
    twitter: "https://x.com/ArculusWallet"
  },
  {
    name: "Mullvad VPN",
    description: "A fast, trustworthy, and open-source VPN focused on reclaiming privacy.",
    category: "Tools",
    link: "https://mullvad.net"
  },
  {
    name: "CLOBr | Liquidity Intelligence",
    description: "X-Ray vision for traders using Solana liquidity data from Meteora and Jupiter.",
    category: "Tools",
    link: "https://clobr.io",
    twitter: "https://x.com/clobr_io"
  },
  {
    name: "Slush (💳 Arc)",
    description: "Earn, swap & explore on Sui Network with a fluid browser wallet extension.",
    category: "Wallets",
    link: "https://slush.app/",
    twitter: "https://x.com/SlushWallet"
  },
  {
    name: "Phoenix",
    description: "Solana’s limit order book perpetuals exchange built for extreme performance.",
    category: "Perps",
    link: "https://phoenix.trade",
    twitter: "https://x.com/PhoenixTrade"
  },
  {
    name: "HyperTracker",
    description: "Track Hyperliquid wallets, positions, order flow, liquidations, and cohorts.",
    category: "Tools",
    link: "https://hypertracker.io/x",
    twitter: "https://x.com/hypertracker_io"
  },
  {
    name: "The White Whale Meme Official",
    description: "The official $WhiteWhale meme community 🐋",
    category: "Meme",
    link: "https://whitewhalememe.com",
    twitter: "https://x.com/WhiteWhaleLabs"
  },
  {
    name: "Zinc",
    description: "A gamified mining experience built on Solana. Play, mine, and earn ⛏️",
    category: "Mining",
    link: "https://zinc.cash/tww",
    twitter: "https://x.com/zinc_cash"
  }
]

const CATEGORIES = ["All", "DeFi", "Perps", "Wallets", "Meme", "Mining", "Tools"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-450 to-indigo-500 bg-clip-text text-transparent">
          Featured Ecosystem Projects
        </h1>
        <p className="text-gray-405 text-lg">
          Key protocols, wallets, and community-driven projects followed or backed by TheWhiteWhale
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 border text-sm ${
              selectedCategory === category
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 text-gray-450 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="glass rounded-2xl p-6 hover:border-blue-500/50 hover:bg-gray-900/10 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  {project.name}
                  <span className="text-gray-500 hover:text-blue-400 text-sm font-normal">
                    ↗
                  </span>
                </a>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-900/40">
              <span className="inline-block px-3 py-1 bg-blue-950/40 text-blue-400 border border-blue-900/30 text-xs font-medium rounded-lg">
                {project.category}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-xs text-white rounded-lg transition-colors font-semibold"
                >
                  Website
                </a>
                {project.twitter && (
                  <a
                    href={project.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                    title="Twitter / X"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info Section */}
      <div className="glass rounded-2xl p-8 border border-gray-800 bg-gradient-to-r from-gray-950 to-gray-900/50">
        <h2 className="text-xl font-bold mb-3 text-white">Why These Projects?</h2>
        <p className="text-gray-400 leading-relaxed text-sm">
          These projects represent some of the strongest innovation and team structures across Solana and the broader EVM ecosystems. 
          Each represents clean execution, community-first alignment, and clear product-market fit.
        </p>
      </div>
    </div>
  )
}
