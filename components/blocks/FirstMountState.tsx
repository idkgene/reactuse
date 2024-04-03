import { useFirstMountState } from '@hooks/useFirstMountState'

export default function FirstMountState() {
  const isFirstMount = useFirstMountState()
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useFirstMountState"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useFirstMountState
        </h2>
        <div>
          {isFirstMount ? (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              🥇 First render
            </p>
          ) : (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              🔜 Subsequent render
            </p>
          )}
        </div>
      </div>
    </>
  )
}
