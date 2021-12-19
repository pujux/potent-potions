import { useState, useEffect } from 'react'
import { useContainer } from 'unstated-next'
import web3UserContainer from './useWeb3User'
import { toast } from 'react-hot-toast'

const useMintAvailable = () => {
  const [isLoading, setLoading] = useState<boolean>()
  const [isAvailable, setIsAvailable] = useState<boolean>()
  let { contract } = useContainer(web3UserContainer)

  useEffect(() => {
    const checkMintAvailable = async () => {
      setLoading(true)
      try {
        if (!contract) {
          console.log(`provider or contract is unavailable.`)
          return
        } else {
          setIsAvailable(await contract.checkAvailable())
        }
      } catch (error: any) {
        console.log({ error })
      }
      setLoading(false)
    }
    void checkMintAvailable()
  }, [contract])

  return { isAvailable, isLoading }
}

export { useMintAvailable }
