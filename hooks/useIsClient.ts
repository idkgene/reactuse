import { useEffect, useState } from 'react'

export const useIsClient = (): boolean => {
  const [isClient, setClient] = useState<boolean>(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}
