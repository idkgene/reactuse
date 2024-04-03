import { useWindowSize } from '@/hooks/useWindowSize'

export default function WindowSizeShowcase() {
  const windowSize = useWindowSize()

  return (
    <div className="grid gap-3 p-4 border rounded-lg">
      <h2
        id="useWindowSize"
        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        useWindowSize
      </h2>
      <div className="max-w-[50ch] text-pretty break-words">
        <p>Window Size {JSON.stringify(windowSize)}</p>
      </div>
    </div>
  )
}
