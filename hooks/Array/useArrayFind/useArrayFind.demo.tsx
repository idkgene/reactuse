import { useArrayFind } from './useArrayFind'

export function UseArrayFindDemo() {
  const list = [1, -1, 2, -2, 3]
  const positiveNumber = useArrayFind(list, (item) => item > 0)

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>First positive number: {positiveNumber}</p>
    </div>
  )
}
