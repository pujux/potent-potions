import { useState } from 'react'
import classnames from 'classnames'
import { utils } from 'ethers'
import { LogoutIcon } from '@heroicons/react/solid'

import useWeb3Container from '../hooks/useWeb3User'
import AddressPill from './addressPill'
import Button from './button'
import ConnectModal from './connectWalletModal'

/**
 * Navigation bar that enables connect/disconnect from Web3.
 */
const Navbar = () => {
  const { wallet, ensName } = useWeb3Container.useContainer()
  const { status, reset, networkName, account, balance } = wallet
  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false)

  const { formatUnits } = utils

  const handleLogout = () => {
    reset()
  }

  const formattedETH = parseFloat(formatUnits(balance)).toFixed(2)

  return (
    <nav className="flex justify-end w-full px-4 py-8" style={{ height: '10vh' }}>
      <ConnectModal setIsOpen={setConnectModalIsOpen} isOpen={connectModalIsOpen} />
      <div className="flex items-center space-x-2">
        {status === 'connected' ? (
          <div className="flex items-center space-x-2">
            <span
              className={classnames(
                'inline-flex items-center px-5 py-1.5 rounded-full text-xs md:text-sm font-medium capitalize',
                {
                  'bg-green-100 text-green-800': networkName == 'matic',
                  'bg-yellow-100 text-yellow-800': networkName !== 'matic',
                },
              )}
            >
              <svg
                className={classnames('-ml-1 mr-1.5 h-2 w-2', {
                  'text-green-400': networkName == 'matic',
                  'text-yellow-400': networkName !== 'matic',
                })}
              >
                <svg
                  className={classnames('-ml-1 mr-1.5 h-2 w-2', {
                    'text-green-400': networkName == 'matic',
                    'text-yellow-400': networkName !== 'matic',
                  })}
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
              </svg>
              {networkName == 'main' ? `Mainnet` : networkName}
            </span>
            <AddressPill address={account ? account : ''} ensName={ensName} balance={formattedETH} />
            <Button
              type="button"
              className="inline-flex items-center p-2 text-white transition-all duration-200 bg-white border border-gray-200 border-solid rounded-md shadow-sm hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogoutIcon fill="#000000" className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            bgColor="green-600"
            darkBgColor="green-600"
            bgHoverColor="green-800"
            darkBgHoverColor="green-800"
            onClick={() => setConnectModalIsOpen(true)}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
