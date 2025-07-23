'use client'

import { modal } from '../../context'
import { useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'

export default function HomePage() {
  const { address, isConnected, connector } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isConnected) {
      modal.open() // auto-open on mount if not connected
    }
  }, [isConnected])

  const handleConnect = () => {
    modal.open()
    setIsModalOpen(true)
  }

  const handleDisconnect = () => {
    modal.disconnect()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to My Web3 App</h1>
      
      {!isConnected ? (
        <div className="text-center">
          <button
            onClick={handleConnect}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Wallet Connected!</h2>
          
          <div className="space-y-3">
            <div>
              <span className="font-medium">Address:</span>
              <p className="text-sm break-all bg-gray-200 dark:bg-gray-700 p-2 rounded mt-1">
                {address}
              </p>
            </div>
            
            {/* <div>
              <span className="font-medium">Network:</span>
              <p className="text-sm">{chain?.name || 'Unknown'}</p>
            </div> */}
            
            <div>
              <span className="font-medium">Balance:</span>
              <p className="text-sm">
                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
              </p>
            </div>
            
            <div>
              <span className="font-medium">Connector:</span>
              <p className="text-sm">{connector?.name || 'Unknown'}</p>
            </div>
          </div>
          
          <button
            onClick={handleDisconnect}
            className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  )
}
