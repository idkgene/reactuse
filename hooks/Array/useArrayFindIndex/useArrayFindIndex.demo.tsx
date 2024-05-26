import { useArrayFindIndex } from './useArrayFindIndex'

export function UseArrayFindIndexDemo() {
  const list = [1, -1, 2, -2, 3]
  const positiveNumberIndex = useArrayFindIndex(list, (item) => item > 0)

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>Index of first positive number: {positiveNumberIndex}</p>
    </div>
  )
}
