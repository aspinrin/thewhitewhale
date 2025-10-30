import { NextResponse } from 'next/server'
import { verifySolanaTransaction, verifyEthereumTransaction } from './lib/blockchain'
import { supabaseAdmin } from './lib/supabase'

export async function POST(request) {
  try {
    const { txHash, chain } = await request.json()

    if (!txHash || !chain) {
      return NextResponse.json(
        { valid: false, error: 'Missing transaction hash or chain' },
        { status: 400 }
      )
    }

    // Check if transaction already used
    const { data: existingTx } = await supabaseAdmin
      .from('used_transactions')
      .select('tx_hash')
      .eq('tx_hash', txHash)
      .single()

    if (existingTx) {
      return NextResponse.json(
        { valid: false, error: 'This transaction has already been used' },
        { status: 400 }
      )
    }

    // Verify based on chain
    let result
    if (chain === 'solana') {
      const expectedAddress = process.env.NEXT_PUBLIC_SOLANA_ADDRESS
      result = await verifySolanaTransaction(txHash, expectedAddress)
    } else if (chain === 'ethereum' || chain === 'base') {
      const expectedAddress = process.env.NEXT_PUBLIC_ETH_ADDRESS
      result = await verifyEthereumTransaction(txHash, expectedAddress, chain)
    } else {
      return NextResponse.json(
        { valid: false, error: 'Invalid chain specified' },
        { status: 400 }
      )
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { valid: false, error: 'Server error during verification' },
      { status: 500 }
    )
  }
}
