import { useSum } from './useSum'

const UseSumDemo = () => {
  const number = [1, 2, 3, 4, 5]
  const sum = useSum(number)

  return (
    <>
      <div>
        <p>Input array: {number.join(', ')}</p>
        <p>Sum: {sum}</p>
      </div>
    </>
  )
}

export default UseSumDemo
