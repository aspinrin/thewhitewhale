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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Live Market Data
        </h1>
        <p className="text-gray-400">
          Track the top cryptocurrencies with real-time price updates
        </p>
      </div>

      {error && (
        <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4 mb-6 text-yellow-400">
          {error}
        </div>
      )}

      <div className="glass rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900/50">
                <th className="text-left py-4 px-6 text-green-400 font-bold">#</th>
                <th className="text-left py-4 px-6 text-green-400 font-bold">CRYPTOCURRENCY</th>
                <th className="text-left py-4 px-6 text-green-400 font-bold">PRICE (USD)</th>
                <th className="text-left py-4 px-6 text-green-400 font-bold">MARKET CAP</th>
                <th className="text-left py-4 px-6 text-green-400 font-bold">24H CHANGE</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 21 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-800">
                    <td className="py-4 px-6">
                      <div className="h-4 w-8 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : (
                prices.map((coin) => (
                  <tr key={coin.rank} className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                    <td className="py-4 px-6 text-gray-400">{coin.rank}</td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-bold text-white">{coin.name} ({coin.symbol})</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      {formatPrice(coin.price)}
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {formatMarketCap(coin.marketCap)}
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center gap-1 font-bold ${
                        coin.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {coin.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
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

      <div className="glass rounded-lg p-6 mt-6">
        <p className="text-gray-400 text-sm">
          Real-time cryptocurrency prices update every 30 seconds. Data provided by CoinGecko API.
        </p>
      </div>
    </div>
  )
}
