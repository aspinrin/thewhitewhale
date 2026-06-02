'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const COINS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'tether', name: 'Tether', symbol: 'USDT' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'usd-coin', name: 'USD Coin', symbol: 'USDC' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'tron', name: 'TRON', symbol: 'TRX' },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'matic-network', name: 'Polygon', symbol: 'MATIC' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
  { id: 'uniswap', name: 'Uniswap', symbol: 'UNI' },
  { id: 'near', name: 'NEAR Protocol', symbol: 'NEAR' },
  { id: 'aptos', name: 'Aptos', symbol: 'APT' },
  { id: 'sui', name: 'Sui', symbol: 'SUI' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB' },
  { id: 'optimism', name: 'Optimism', symbol: 'OP' },
]

export default function PricesPage() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchPrices = async () => {
    try {
      const coinIds = COINS.map(c => c.id).join(',')
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices')
      }

      const data = await response.json()

      const priceArray = COINS.map((coin, index) => {
        const coinData = data[coin.id]
        if (!coinData) {
          return {
            rank: index + 1,
            name: coin.name,
            symbol: coin.symbol,
            price: 0,
            marketCap: 0,
            change: 0
          }
        }

        return {
          rank: index + 1,
          name: coin.name,
          symbol: coin.symbol,
          price: coinData.usd || 0,
          marketCap: coinData.usd_market_cap || 0,
          change: coinData.usd_24h_change || 0
        }
      })

      setPrices(priceArray)
      setLoading(false)
      setError(null)
    } catch (err) {
      console.error('Error fetching prices:', err)
      setError('Failed to load prices. Retrying...')
      setTimeout(fetchPrices, 5000)
    }
  }

  const formatPrice = (price) => {
    if (price === 0) return '$0.00'
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (cap) => {
    if (cap === 0) return '$0'
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`
    return `$${cap.toLocaleString()}`
  }

  const filteredPrices = prices.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
          Live Market Tracker
        </h1>
        <p className="text-gray-400 text-lg">
          Monitor real-time price updates for top-tier crypto assets
        </p>
      </div>

      {error && (
        <div className="bg-yellow-950/30 border border-yellow-800 rounded-xl p-4 mb-6 text-yellow-400 text-sm">
          {error}
        </div>
      )}

      {/* Control Actions (Search & Pulse status) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-gray-450 font-mono">Live feeds active (updates every 30s)</span>
        </div>
        
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search tokens (name or symbol)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900/60 border border-gray-800 focus:border-emerald-500 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden border border-gray-850 bg-gray-950/20 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-850 bg-gray-900/40 text-left">
                <th className="py-4 px-6 text-gray-400 font-bold text-xs uppercase tracking-wider">#</th>
                <th className="py-4 px-6 text-gray-400 font-bold text-xs uppercase tracking-wider">Asset</th>
                <th className="py-4 px-6 text-gray-400 font-bold text-xs uppercase tracking-wider">Price (USD)</th>
                <th className="py-4 px-6 text-gray-400 font-bold text-xs uppercase tracking-wider">Market Cap</th>
                <th className="py-4 px-6 text-gray-400 font-bold text-xs uppercase tracking-wider">24H Change</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-900/50">
                    <td className="py-4.5 px-6">
                      <div className="h-4 w-4 bg-gray-850 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="h-4 w-32 bg-gray-850 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="h-4 w-20 bg-gray-850 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="h-4 w-24 bg-gray-850 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="h-4 w-16 bg-gray-850 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : filteredPrices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 text-sm">
                    No matching assets found. Try searching for something else.
                  </td>
                </tr>
              ) : (
                filteredPrices.map((coin) => (
                  <tr key={coin.rank} className="border-b border-gray-900/50 hover:bg-gray-900/20 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-mono text-sm">{coin.rank}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{coin.name}</span>
                        <span className="text-xs text-gray-500 font-semibold bg-gray-900 border border-gray-800 px-1.5 py-0.5 rounded uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-white font-mono text-sm">
                      {formatPrice(coin.price)}
                    </td>
                    <td className="py-4 px-6 text-gray-300 font-mono text-sm">
                      {formatMarketCap(coin.marketCap)}
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      <div className={`flex items-center gap-1 font-bold ${
                        coin.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {coin.change >= 0 ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                        {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mt-6 border border-gray-850 bg-gray-950/10">
        <p className="text-gray-500 text-xs leading-relaxed">
          Real-time price feeds are fetched dynamically from the CoinGecko public API. Rates may vary slightly from spot exchanges.
        </p>
      </div>
    </div>
  )
}
