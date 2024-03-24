import { useCallback, useState } from 'react'

export function useList<T>(defaultList: T[] = []) {
  const [list, setList] = useState(defaultList)

  const set = useCallback((l: T[]) => {
    setList(l)
  }, [])

  const push = useCallback((element: T) => {
    setList((l) => [...l, element])
  }, [])

  const removeAt = useCallback((index: number) => {
    setList((l) => [...l.slice(0, index), ...l.slice(index + 1)])
  }, [])

  const insertAt = useCallback((index: number, element: T) => {
    setList((l) => [...l.slice(0, index), element, ...l.slice(index)])
  }, [])

  const updateAt = useCallback((index: number, element: T) => {
    setList((l) => l.map((e, i) => (i === index ? element : e)))
  }, [])

  const clear = useCallback(() => setList([]), [])

  return [list, { set, push, removeAt, insertAt, updateAt, clear }]
}
