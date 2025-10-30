import { Connection, PublicKey } from '@solana/web3.js'
import { ethers } from 'ethers'

const USDC_SOLANA = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
const USDC_ETHEREUM = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'

export async function verifySolanaTransaction(txHash, expectedRecipient) {
  try {
    const connection = new Connection(
      process.env.HELIUS_RPC_URL || 'https://api.mainnet-beta.solana.com',
      'confirmed'
    )

    const tx = await connection.getParsedTransaction(txHash, {
      maxSupportedTransactionVersion: 0
    })

    if (!tx || !tx.meta) {
      return { valid: false, error: 'Transaction not found' }
    }

    // Check if transaction was successful
    if (tx.meta.err) {
      return { valid: false, error: 'Transaction failed on chain' }
    }

    // Find USDC transfer
    const postTokenBalances = tx.meta.postTokenBalances || []
    const preTokenBalances = tx.meta.preTokenBalances || []

    let usdcTransferred = false
    let correctAmount = false
    let correctRecipient = false

    for (let i = 0; i < postTokenBalances.length; i++) {
      const post = postTokenBalances[i]
      const pre = preTokenBalances.find(p => p.accountIndex === post.accountIndex)

      if (post.mint === USDC_SOLANA) {
        const postAmount = parseFloat(post.uiTokenAmount.uiAmount)
        const preAmount = pre ? parseFloat(pre.uiTokenAmount.uiAmount) : 0
        const transferred = postAmount - preAmount

        if (transferred > 0) {
          usdcTransferred = true
          // USDC has 6 decimals, so 10 USDC = 10.0
          if (Math.abs(transferred - 10.0) < 0.01) {
            correctAmount = true
          }

          // Check recipient
          const recipientKey = post.owner
          if (recipientKey === expectedRecipient) {
            correctRecipient = true
          }
        }
      }
    }

    if (!usdcTransferred) {
      return { valid: false, error: 'No USDC transfer found' }
    }

    if (!correctAmount) {
      return { valid: false, error: 'Incorrect amount (must be exactly 10 USDC)' }
    }

    if (!correctRecipient) {
      return { valid: false, error: 'Wrong recipient address' }
    }

    return { valid: true }

  } catch (error) {
    console.error('Solana verification error:', error)
    return { valid: false, error: 'Verification failed: ' + error.message }
  }
}

export async function verifyEthereumTransaction(txHash, expectedRecipient, chain = 'ethereum') {
  try {
    const rpcUrl = chain === 'base' 
      ? 'https://mainnet.base.org'
      : (process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com')
    
    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const tx = await provider.getTransaction(txHash)

    if (!tx) {
      return { valid: false, error: 'Transaction not found' }
    }

    const receipt = await provider.getTransactionReceipt(txHash)
    
    if (!receipt) {
      return { valid: false, error: 'Transaction not confirmed yet' }
    }

    if (receipt.status !== 1) {
      return { valid: false, error: 'Transaction failed on chain' }
    }

    // USDC contract address
    const usdcAddress = chain === 'base' ? USDC_BASE : USDC_ETHEREUM
    
    // Check if transaction is to USDC contract
    if (tx.to.toLowerCase() !== usdcAddress.toLowerCase()) {
      return { valid: false, error: 'Not a USDC transaction' }
    }

    // Decode transfer data
    const iface = new ethers.Interface([
      'function transfer(address to, uint256 amount)'
    ])

    let decodedData
    try {
      decodedData = iface.parseTransaction({ data: tx.data })
    } catch {
      return { valid: false, error: 'Invalid USDC transfer' }
    }

    const recipient = decodedData.args[0]
    const amount = decodedData.args[1]

    // USDC has 6 decimals
    const amountInUSDC = parseFloat(ethers.formatUnits(amount, 6))

    if (recipient.toLowerCase() !== expectedRecipient.toLowerCase()) {
      return { valid: false, error: 'Wrong recipient address' }
    }

    if (Math.abs(amountInUSDC - 10.0) > 0.01) {
      return { valid: false, error: 'Incorrect amount (must be exactly 10 USDC)' }
    }

    return { valid: true }

  } catch (error) {
    console.error('Ethereum verification error:', error)
    return { valid: false, error: 'Verification failed: ' + error.message }
  }
}
