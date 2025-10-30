'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')
  const [supabaseClient, setSupabaseClient] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('admin_auth') === 'true'
      setAuthenticated(isAuth)
      
      if (isAuth) {
        initializeSupabase()
      }
    }
  }, [])

  useEffect(() => {
    if (authenticated && supabaseClient) {
      loadSubmissions()
    }
  }, [authenticated, filter, supabaseClient])

  const initializeSupabase = () => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url || !key) {
        setError('Supabase configuration missing')
        return
      }

      const client = createClient(url, key)
      setSupabaseClient(client)
    } catch (err) {
      setError('Failed to initialize database: ' + err.message)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    
    const ADMIN_PASSWORD = 'SafetyWhale???1'
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      setAuthenticated(true)
      setError('')
      initializeSupabase()
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthenticated(false)
    setSupabaseClient(null)
    setSubmissions([])
  }

  const loadSubmissions = async () => {
    if (!supabaseClient) return
    
    setLoading(true)
    try {
      let query = supabaseClient
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error loading submissions:', error)
        setError('Failed to load submissions: ' + error.message)
      } else {
        setSubmissions(data || [])
      }
    } catch (err) {
      setError('Error: ' + err.message)
    }
    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    if (!supabaseClient) return

    const { error } = await supabaseClient
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      loadSubmissions()
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 rounded-lg p-8 border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-6">Admin Login</h1>
          
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  const totalEarned = submissions.length * 10

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Contact Submissions</h1>
          <div className="flex items-center gap-4">
            <div className="bg-gray-900 px-6 py-3 rounded-lg border border-gray-800">
              <p className="text-sm text-gray-400">Total Earned</p>
              <p className="text-2xl font-bold text-green-500">${totalEarned} USDC</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          {['all', 'pending', 'read', 'replied'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 border border-gray-800 hover:border-blue-500'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
