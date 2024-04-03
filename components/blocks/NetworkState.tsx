import { useNetworkState } from '@/hooks/useNetworkState'

export default function NetworkState() {
  const networkState = useNetworkState()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useNetworkState"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useNetworkState
        </h2>
        <div>
          <p>Online: {networkState.online ? 'Yes' : 'No'}</p>
          <p>Speed: {networkState.speed}</p>
          <p>Type: {networkState.type}</p>
        </div>
      </div>
    </>
  )
}
