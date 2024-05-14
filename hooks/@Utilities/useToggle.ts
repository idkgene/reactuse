import { useCallback, useState } from 'react'

interface UseToggleOptions<Truthy, Falsy> {
  truthyValue?: Truthy
  falsyValue?: Falsy
}

function useToggle<Truthy = true, Falsy = false>(
  initialValue: Truthy | Falsy = false as Falsy,
  options: UseToggleOptions<Truthy, Falsy> = {}
): [Truthy | Falsy, (value?: Truthy | Falsy) => void] {
  const { truthyValue = true as Truthy, falsyValue = false as Falsy } = options
  const [state, setState] = useState<Truthy | Falsy>(initialValue)

  const toggle = useCallback(
    (value?: Truthy | Falsy) => {
      if (value !== undefined) {
        setState(value)
      } else {
        setState((prevState) =>
          prevState === truthyValue ? falsyValue : truthyValue
        )
      }
    },
    [truthyValue, falsyValue]
  )

  return [state, toggle]
}

export default useToggle
