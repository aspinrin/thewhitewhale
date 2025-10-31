'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser, signOut } from '@/lib/auth'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      loadSubmissions()
    }
  }, [user, filter])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      router.push('/admin/login')
      return
    }

    setUser(currentUser)
    setLoading(false)
  }

  const handleLogout = async () => {
    const result = await signOut()
    
    if (result.success) {
      router.push('/admin/login')
      router.refresh()
    }
  }

  const loadSubmissions = async () => {
    setLoading(true)
    setError('')

    try {
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) {
        setError('Failed to load submissions')
      } else {
        setSubmissions(data || [])
      }
    } catch (err) {
      setError('Error loading data')
    }

    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    await supabase
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', id)

    loadSubmissions()
  }

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const totalEarned = submissions.length * 10

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome, {user.email}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-gray-900 px-6 py-3 rounded-lg border border-gray-800">
              <p className="text-sm text-gray-400">Total Earned</p>
              <p className="text-2xl font-bold text-green-500">${totalEarned} USDC</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          {['all', 'pending', 'read', 'replied'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 border border-gray-800 hover:border-blue-500 text-gray-300'
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
          <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
            <p className="text-gray-400">No submissions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub.id} className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{sub.full_name}</h3>
                    <p className="text-blue-400">@{sub.x_handle}</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </div>
                </div>

                {sub.discord && (
                  <p className="text-sm text-gray-400 mb-1">Discord: {sub.discord}</p>
                )}
                {sub.telegram && (
                  <p className="text-sm text-gray-400 mb-1">Telegram: {sub.telegram}</p>
                )}

                <div className="bg-gray-800 rounded-lg p-4 my-4">
                  <p className="text-sm text-gray-300">{sub.message}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => updateStatus(sub.id, 'read')}
                    className="px-3 py-1 rounded text-sm bg-yellow-600 hover:bg-yellow-700"
                  >
                    Mark Read
                  </button>
                  <button
                    onClick={() => updateStatus(sub.id, 'replied')}
                    className="px-3 py-1 rounded text-sm bg-green-600 hover:bg-green-700"
                  >
                    Mark Replied
                  </button>
                  
                    href={
                      sub.chain === 'solana'
                        ? 'https://solscan.io/tx/' + sub.tx_hash
                        : 'https://etherscan.io/tx/' + sub.tx_hash
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View TX
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
