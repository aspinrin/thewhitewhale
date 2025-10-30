import { NextResponse } from 'next/server'
import { verifySolanaTransaction, verifyEthereumTransaction } from '@/lib/blockchain'
import { supabaseAdmin } from '@/lib/supabase'

async function sendTelegramNotification(submission) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.log('Telegram not configured, skipping notification')
    return
  }

  const message = `
🐋 *New Contact Request*

*Name:* ${submission.full_name}
*X:* @${submission.x_handle}
${submission.discord ? `*Discord:* ${submission.discord}` : ''}
${submission.telegram ? `*Telegram:* ${submission.telegram}` : ''}
*Chain:* ${submission.chain.toUpperCase()}
*Amount:* $${submission.amount_usd} USDC
*TX:* \`${submission.tx_hash.substring(0, 8)}...${submission.tx_hash.slice(-8)}\`

*Message:*
${submission.message}

View all: https://thewhitewhale.xyz/admin
`

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    })
  } catch (error) {
    console.error('Telegram notification failed:', error)
  }
}

export async function POST(request) {
  try {
    const { txHash, chain, formData } = await request.json()

    // Validate form data
    if (!formData.fullName || !formData.xHandle || !formData.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (formData.message.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Message too long (max 500 characters)' },
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
        { success: false, error: 'This transaction has already been used' },
        { status: 400 }
      )
    }

    // Verify transaction again (security)
    let verificationResult
    if (chain === 'solana') {
      const expectedAddress = process.env.NEXT_PUBLIC_SOLANA_ADDRESS
      verificationResult = await verifySolanaTransaction(txHash, expectedAddress)
    } else {
      const expectedAddress = process.env.NEXT_PUBLIC_ETH_ADDRESS
      verificationResult = await verifyEthereumTransaction(txHash, expectedAddress, chain)
    }

    if (!verificationResult.valid) {
      return NextResponse.json(
        { success: false, error: 'Transaction verification failed' },
        { status: 400 }
      )
    }

    // Get sender address (simplified - in production extract from tx)
    let senderAddress = 'unknown'

    // Insert submission
    const { data: submission, error: insertError } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        tx_hash: txHash,
        chain: chain,
        amount_usd: 10,
        sender_address: senderAddress,
        full_name: formData.fullName,
        x_handle: formData.xHandle,
        discord: formData.discord || null,
        telegram: formData.telegram || null,
        message: formData.message,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { success: false, error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    // Mark transaction as used
    await supabaseAdmin
      .from('used_transactions')
      .insert({ tx_hash: txHash })

    // Send Telegram notification
    await sendTelegramNotification(submission)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error during submission' },
      { status: 500 }
    )
  }
}
