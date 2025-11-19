export default function Charity() {
  const donations = [
    {
      recipient: "ZachXBT",
      description: "Supporting crypto investigative journalism",
      website: null,
      tx: "0xdb5cd8ed3f97a458211af8aeb5484da0a1a2f627315454a35476bd280a75acb6",
      amount: "157,843.27 USDC" 
    },
    {
      recipient: "Help the Homeless Keiki",
      description: "Hawaiian youth homelessness support",
      website: "https://www.helpthehomelesskeiki.org/",
      tx: "0x3a437b3fd1d63440ab04d841bf29c263a7a9f4f2cb6f5f72f3bcc6c78c0b0763",
      amount: "155,502.54" 
    },
    {
      recipient: "CryptoGaza",
      description: "Crypto humanitarian aid for Gaza",
      website: "https://cryptogaza.com",
      tx: "0x2b163aa69c0d8ab66a33562f9a53cc31420b9e42960742840caef2778297234c",
      amount: "155,234.11" 
    },
    {
      recipient: "Bardet Biedl Syndrome Foundation",
      description: "Charitable organization",
      website: "https://app.endaoment.org/orgs/46-3343666",
      tx: "0x7b6559f19c9995aff7961330e3d678c888513290d809709fcc442ea51cd17927",
      amount: "155,335.92"
    },
    {
      recipient: "Gazas Children",
      description: "Charitable organization",
      website: "https://app.endaoment.org/orgs/93-4736372",
      tx: "0x7ae114432cb7bb30258ae8f3d86fde73dc709fc9d13c18035f2d7d6794db5757",
      amount: "153,005.88"
    },
    {
      recipient: "Family Agriculture Resource Management Services",
      description: "Charitable organization",
      website: "https://app.endaoment.org/orgs/46-4623115",
      tx: "0x7a5c9b6b90ccdad3a1f535b24d1d300e458848d0c62ab4c63e57ca7b1db62a20",
      amount: "155,335.92"
    },
    {
      recipient: "AL-AYN SOCIAL CARE FOUNDATION",
      description: "Charitable organization",
      website: "https://app.endaoment.org/orgs/47-1614315",
      tx: "0x5daf79b66869a6d1659e9fc28f2083de7825fec0c9604425afd73f8c81e3832a",
      amount: "155,335.92"
    },
    {
      recipient: "Banco de Alimentos de Bogota",
      description: "Charitable organization",
      website: "https://app.endaoment.org/orgs/cfe3d38b-4200-bb3b-dd6b-602a4e87755f",
      tx: "0xfb9ee55291c769b4248ba53e093c0c1554e964592d9aeaf880f1e827eaeac435",
      amount: "155,335.92"
    },
    {
      recipient: "Young Life",
      description: "Charitable organization",
      website: "https://app.endaoment.org/orgs/84-0385934",
      tx: "0x5e67e84de2c6f7ad54781c395079b9b6a38a193eed4f60cd2697d66e2b0a6de9",
      amount: "155,335.92"
    },
    {
      recipient: "Journeys Urging Mammoth Possibilities",
      description: "Charitable organization",
      website: "https://app.endaoment.org/orgs/26-2232296",
      tx: "0x318980624be0c8d1580c218e497b5fa00dab620d9b664708b9b0068063517f7b",
      amount: "155,335.92"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Charitable <span className="text-blue-400">Contributions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Supporting meaningful causes through transparent, on-chain donations on Base Network
            </p>
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {donations.map((donation, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {donation.recipient}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {donation.description}
                  </p>
                </div>
                <div className="ml-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Base
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="mb-4 p-3 bg-gray-900/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400">
                  {donation.amount}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2">
                {donation.website && (
                  <a
                    href={donation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group"
                  >
                    <span className="font-medium">Visit Organization</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                
                <a
                  href={`https://basescan.org/tx/${donation.tx}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors group"
                >
                  <span className="font-medium">View Transaction</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </a>
              </div>

              {/* Transaction Hash (shortened) */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-500 font-mono">
                  Tx: {donation.tx.slice(0, 10)}...{donation.tx.slice(-8)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-800/50 border border-gray-700 rounded-xl p-6 max-w-2xl">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-lg font-semibold text-white">Transparent Giving</h3>
            </div>
            <p className="text-gray-400 text-sm">
              All donations are verifiable on-chain through Base Network. Click any transaction link to verify the donation amount and destination on BaseScan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
