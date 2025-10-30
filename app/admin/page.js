'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { CheckCircle, Clock, MessageCircle } from 'lucide-react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (authenticated) {
      loadSubmissions()
    }
  }, [authenticated, filter])

  const handleLogin = () => {
    // Simple password check - replace with Supabase auth in production
    if (password === 'demo123') {
      setAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  const loadSubmissions = async () => {
    setLoading(true)
    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error loading submissions:', error)
    } else {
      setSubmissions(data || [])
    }
    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      loadSubmissions()
    }
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="glass rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:border-blue-500 outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  const totalEarned = submissions.length * 10

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Contact Submissions</h1>
        <div className="glass px-6 py-3 rounded-lg">
          <p className="text-sm text-gray-400">Total Earned</p>
          <p className="text-2xl font-bold text-green-500">${totalEarned} USDC</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'pending', 'read', 'replied'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'glass hover:border-blue-500'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="glass rounded-lg p-12 text-center">
          <p className="text-gray-400">No submissions yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="glass rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{sub.full_name}</h3>
                  <p className="text-blue-400">@{sub.x_handle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    {sub.chain === 'solana' ? '◎ Solana' : 'Ξ Ethereum'}
                  </p>
                </div>
              </div>

              {sub.discord && (
                <p className="text-sm text-gray-400 mb-1">Discord: {sub.discord}</p>
              )}
              {sub.telegram && (
                <p className="text-sm text-gray-400 mb-1">Telegram: {sub.telegram}</p>
              )}

              <div className="bg-gray-900/50 rounded-lg p-4 my-4">
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{sub.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(sub.id, 'read')}
                    className={`px-3 py-1 rounded text-sm ${
                      sub.status === 'read'
                        ? 'bg-yellow-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <Clock size={14} className="inline mr-1" />
                    Read
                  </button>
                  <button
                    onClick={() => updateStatus(sub.id, 'replied')}
                    className={`px-3 py-1 rounded text-sm ${
                      sub.status === 'replied'
                        ? 'bg-green-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <CheckCircle size={14} className="inline mr-1" />
                    Replied
                  </button>
                </div>

                <a
                  href={
                    sub.chain === 'solana'
                      ? `https://solscan.io/tx/${sub.tx_hash}`
                      : `https://etherscan.io/tx/${sub.tx_hash}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  View TX ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
