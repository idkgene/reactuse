import { useBreakpoint } from './useBreakpoint'

const UseBreakpointDemo = () => {
  const { windowWidth, isBreakpointCrossed } = useBreakpoint(768)

  return (
    <div>
      <p>Window width: {windowWidth}</p>
      <p>Breakpoint crossed: {isBreakpointCrossed ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default UseBreakpointDemo