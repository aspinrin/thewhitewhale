'use client'

import { useState } from 'react'
import { Copy, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [step, setStep] = useState(1)
  const [chain, setChain] = useState(null)
  const [txHash, setTxHash] = useState('')
  const [txVerified, setTxVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    xHandle: '',
    discord: '',
    telegram: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const solanaAddress = process.env.NEXT_PUBLIC_SOLANA_ADDRESS
  const ethAddress = process.env.NEXT_PUBLIC_ETH_ADDRESS

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address)
  }

  const verifyTransaction = async () => {
    if (!txHash.trim()) {
      setError('Please enter a transaction hash')
      return
    }

    setVerifying(true)
    setError('')

    try {
      const response = await fetch('/api/verify-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash: txHash.trim(), chain })
      })

      const data = await response.json()

      if (data.valid) {
        setTxVerified(true)
        setStep(4)
      } else {
        setError(data.error || 'Transaction verification failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setVerifying(false)
    }
  }

  const submitContact = async () => {
    if (!formData.fullName || !formData.xHandle || !formData.message) {
      setError('Please fill all required fields')
      return
    }

    if (formData.message.length > 500) {
      setError('Message must be 500 characters or less')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash, chain, formData })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'Submission failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Submission Received!</h1>
        <p className="text-gray-400 mb-8">
          Your verified contact request has been submitted to TheWhiteWhale.
          Please note that payment does not guarantee a response.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact TheWhiteWhale</h1>

      {/* Step 1: Disclaimer */}
      {step === 1 && (
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Important Notice</h2>
          <div className="space-y-4 text-gray-300 mb-8">
            <p>
              Payment is required to submit a contact request. This filters for serious 
              inquiries and respects TheWhiteWhale's time.
            </p>
            <p className="font-bold text-yellow-400">
              ⚠️ Payment does NOT guarantee a response or partnership opportunity.
            </p>
            <p>
              All payments are non-refundable. By continuing, you acknowledge and 
              accept these terms.
            </p>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-bold"
          >
            I Understand, Continue →
          </button>
        </div>
      )}

      {/* Step 2: Chain Selection */}
      {step === 2 && (
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Choose Payment Network</h2>
          <div className="space-y-4 mb-8">
            <button
              onClick={() => {
                setChain('solana')
                setStep(3)
              }}
              className="w-full glass hover:border-purple-500 p-6 rounded-lg text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Solana</h3>
                  <p className="text-gray-400">Pay with USDC on Solana (SPL)</p>
                </div>
                <div className="text-3xl">◎</div>
              </div>
            </button>

            <button
              onClick={() => {
                setChain('ethereum')
                setStep(3)
              }}
              className="w-full glass hover:border-blue-500 p-6 rounded-lg text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ethereum / Base</h3>
                  <p className="text-gray-400">Pay with USDC on ETH or Base</p>
                </div>
                <div className="text-3xl">Ξ</div>
              </div>
            </button>
          </div>
          <button
            onClick={() => setStep(1)}
            className="text-gray-400 hover:text-white"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3: Payment Verification */}
      {step === 3 && !txVerified && (
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Send Payment</h2>

          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-red-400 mb-4">⚠️ CRITICAL INSTRUCTIONS</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Send exactly <span className="font-bold text-white">$10 USDC</span></li>
              <li>• Sending less = Rejected, no refund</li>
              <li>• Sending more does NOT increase your chances</li>
              <li>• Wrong token or network = Lost funds</li>
              <li>• Double-check address before sending</li>
            </ul>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 mb-3">Send to this address:</p>
            <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg">
              <code className="flex-1 text-sm break-all">
                {chain === 'solana' ? solanaAddress : ethAddress}
              </code>
              <button
                onClick={() => copyAddress(chain === 'solana' ? solanaAddress : ethAddress)}
                className="text-blue-500 hover:text-blue-400"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <img 
              src={chain === 'solana' ? '/qr-solana.png' : '/qr-eth.png'}
              alt="Payment QR Code"
              className="mx-auto w-64 h-64 border border-gray-700 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Paste Transaction Hash:</label>
            <input
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder={chain === 'solana' ? '5abc...' : '0x123...'}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-1" size={20} />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={verifyTransaction}
            disabled={verifying}
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying Transaction...
              </>
            ) : (
              'Verify Transaction →'
            )}
          </button>

          <button
            onClick={() => setStep(2)}
            className="text-gray-400 hover:text-white mt-4"
          >
            ← Change Network
          </button>
        </div>
      )}

      {/* Step 4: Contact Form */}
      {step === 4 && txVerified && (
        <div className="glass rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-green-500" size={32} />
            <h2 className="text-2xl font-bold">Payment Verified!</h2>
          </div>

          <p className="text-gray-400 mb-6">
            Complete your contact request below:
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">X Handle *</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">@</span>
                <input
                  type="text"
                  value={formData.xHandle}
                  onChange={(e) => setFormData({...formData, xHandle: e.target.value})}
                  placeholder="username"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Discord (Optional)</label>
              <input
                type="text"
                value={formData.discord}
                onChange={(e) => setFormData({...formData, discord: e.target.value})}
                placeholder="username#1234"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Telegram (Optional)</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                placeholder="@username"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Your Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                maxLength={500}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.message.length}/500 characters
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-1" size={20} />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={submitContact}
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Submitting...
              </>
            ) : (
              'Submit to TheWhiteWhale →'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
