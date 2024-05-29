import { useEffect } from 'react'

type Callback = () => void

export const useDidMount = (callback: Callback) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
