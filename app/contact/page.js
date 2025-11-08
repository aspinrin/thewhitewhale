'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { verifySolanaTransaction, verifyEthereumTransaction } from '@/lib/blockchain'

// ⚠️ FEATURE TOGGLE - Set to 'false' to enable the form
const CONTACT_DISABLED = true

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    xHandle: '',
    discord: '',
    telegram: '',
    message: '',
    chain: 'solana',
    txHash: ''
  })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // If contact is disabled, show unavailable message
  if (CONTACT_DISABLED) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-gray-900 rounded-lg p-8 md:p-12 border border-gray-800">
            <div className="mb-6">
              <div className="inline-block p-4 bg-gray-800 rounded-full mb-4">
                <svg 
                  className="w-12 h-12 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" 
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Contact Form Unavailable
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                The premium contact form is temporarily unavailable. Please check back soon or reach out directly via X.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
              <p className="text-gray-300 mb-4">
                For immediate inquiries, connect with TheWhiteWhale on X:
              </p>

              {/* ✅ Fixed missing <a> tag */}
              <a
                href="https://x.com/TheWhiteWhaleV2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Visit @TheWhiteWhaleV2
              </a>
            </div>

            <p className="text-sm text-gray-500">
              This page will be restored once the contact system is back online.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ===== ORIGINAL CONTACT FORM CODE BELOW (KEPT INTACT) =====
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Verify transaction based on chain
      let verification
      const expectedRecipient = formData.chain === 'solana'
        ? process.env.NEXT_PUBLIC_SOLANA_ADDRESS
        : process.env.NEXT_PUBLIC_ETH_ADDRESS

      if (formData.chain === 'solana') {
        verification = await verifySolanaTransaction(formData.txHash, expectedRecipient)
      } else {
        verification = await verifyEthereumTransaction(formData.txHash, expectedRecipient)
      }

      if (!verification.valid) {
        setError(verification.error || 'Transaction verification failed')
        setLoading(false)
        return
      }

      // Save to Supabase
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          full_name: formData.fullName,
          x_handle: formData.xHandle,
          discord: formData.discord,
          telegram: formData.telegram,
          message: formData.message,
          chain: formData.chain,
          tx_hash: formData.txHash,
          status: 'pending'
        }])

      if (dbError) {
        setError('Failed to submit: ' + dbError.message)
        setLoading(false)
        return
      }

      setStep(3) // Success
    } catch (err) {
      setError('Error: ' + err.message)
    }

    setLoading(false)
  }

  // Original form JSX continues here...
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      {/* Your existing form code */}
    </div>
  )
}
