'use client'

import { useState } from 'react'

const projects = [
  {
    name: "Hyperliquid",
    description: "Leading DEX Trading Platform for perpetuals and spot markets.",
    category: "Perps",
    link: "https://app.hyperliquid.xyz/trade"
  },
  {
    name: "Pacifica",
    description: "Building the next generation of perp exchanges.",
    category: "Perps",
    link: "https://pacifica.fi"
  },
  {
    name: "DefiTuna",
    description: "Solana's most advanced AMM and advanced LP toolkit.",
    category: "DeFi",
    link: "https://defituna.com"
  },
  {
    name: "Drift",
    description: "The capital-efficient DeFi platform on Solana.",
    category: "Perps",
    link: "https://app.drift.trade"
  },
  {
    name: "TOSHI",
    description: "Memecoin on Base named after Coinbase co-founder Brian Armstrong's cat.",
    category: "Meme",
    link: "https://www.toshithecat.com"
  },
  {
    name: "Pudgy Penguins",
    description: "The adorable, community-focused face of Web3 NFTs and culture 🐧",
    category: "Meme",
    link: "https://pengu.pudgypenguins.com"
  },
  {
    name: "Wasabi Protocol",
    description: "Asset-backed trading app with native yield mechanisms.",
    category: "DeFi",
    link: "https://wasabi.xyz"
  },
  {
    name: "Aave",
    description: "The most trusted financial lending network. Earn, borrow, save, and swap.",
    category: "DeFi",
    link: "https://aave.com"
  },
  {
    name: "Solflare",
    description: "Safe and powerful self-custody wallet built specifically for Solana.",
    category: "Wallets",
    link: "https://solflare.com"
  },
  {
    name: "Rabby Wallet",
    description: "The game-changing browser wallet for Ethereum and all EVM chains.",
    category: "Wallets",
    link: "https://rabby.io"
  },
  {
    name: "Adrena",
    description: "Solana Perps DEX. 100x Leverage, 0% Slippage, and 90% Rev Share. Community Owned.",
    category: "Perps",
    link: "https://adrena.trade"
  },
  {
    name: "Arculus",
    description: "Arculus® hardware security platform for simple and sleek digital asset protection.",
    category: "Wallets",
    link: "https://www.getarculus.com"
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
    link: "https://clobr.io"
  },
  {
    name: "Slush (💳 Arc)",
    description: "Earn, swap & explore on Sui Network with a fluid browser wallet extension.",
    category: "Wallets",
    link: "https://slush.app/"
  },
  {
    name: "Phoenix",
    description: "Solana’s limit order book perpetuals exchange built for extreme performance.",
    category: "Perps",
    link: "https://phoenix.trade"
  },
  {
    name: "HyperTracker",
    description: "Track Hyperliquid wallets, positions, order flow, liquidations, and cohorts.",
    category: "Tools",
    link: "https://hypertracker.io/x"
  },
  {
    name: "The White Whale Meme Official",
    description: "The official $WhiteWhale meme community 🐋",
    category: "Meme",
    link: "https://whitewhalememe.com"
  },
  {
    name: "Zinc",
    description: "A gamified mining experience built on Solana. Play, mine, and earn ⛏️",
    category: "Mining",
    link: "https://zinc.cash/tww"
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
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-6 hover:border-blue-500/50 hover:bg-gray-900/20 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <span className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg">
                  ↗
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-blue-950/40 text-blue-400 border border-blue-900/30 text-xs font-medium rounded-lg">
                {project.category}
              </span>
            </div>
          </a>
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
