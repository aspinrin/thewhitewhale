'use client'

const projects = [
  {
    name: "Hyperliquid",
    description: "Leading DEX Trading Platform",
    category: "DeFi",
    link: "https://app.hyperliquid.xyz/trade"
  },
  {
    name: "DefiTuna",
    description: "Solana's most advanced AMM and advanced LP toolkit.",
    category: "DeFi",
    link: "defituna.com"
  },
  {
    name: "Marinade",
    description: "Liquid staking protocol",
    category: "DeFi",
    link: "https://marinade.finance"
  },
  {
    name: "Raydium",
    description: "Automated market maker",
    category: "DeFi",
    link: "https://raydium.io"
  },
  {
    name: "Phantom",
    description: "Multi-chain crypto wallet",
    category: "Infrastructure",
    link: "https://phantom.app"
  },
  {
    name: "Monad",
    description: "Layer 1 blockchain bringing parallel execution to the EVM || 10,000 TPS",
    category: "Chain",
    link: "https://www.monad.xyz/"
  }
]

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
      <p className="text-gray-400 mb-8">
        Key projects in the Solana ecosystem backed or followed by TheWhiteWhale
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-lg p-6 hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              <span className="text-2xl">↗</span>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">
              {project.description}
            </p>

            <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
              {project.category}
            </div>
          </a>
        ))}
      </div>

      <div className="glass rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">About These Projects</h2>
        <p className="text-gray-400">
          These represent some of the strongest builders in the Solana ecosystem. 
          Each project demonstrates technical excellence, community alignment, and 
          sustainable business models.
        </p>
      </div>
    </div>
  )
}
