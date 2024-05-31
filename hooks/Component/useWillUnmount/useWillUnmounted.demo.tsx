import { useWillUnmount } from './useWillUnmount'

const UseWillUnmountDemo = () => {
  useWillUnmount(() => {
    console.log('Component unmounted!')
  })

  return (
    <div>
      <p>This component will log a message to the console when it unmounts.</p>
    </div>
  )
}

export default UseWillUnmountDemo
