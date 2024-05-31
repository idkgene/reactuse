import { useInitialUnmount } from './useInitialUnmount'

const UseInitialUnmountDemo = () => {
  useInitialUnmount(() => {
    console.log('Component unmounted!')
  })

  return (
    <div>
      <p>This component will log a message to the console when it unmounts.</p>
    </div>
  )
}

export default UseInitialUnmountDemo
