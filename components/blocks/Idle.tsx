import { useIdle } from '@hooks/useIdle'

export default function IdleShowcase() {
  const isIdle = useIdle(60000) // 1 minute

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useIdle"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useIdle
        </h2>
        <div>
          {isIdle ? (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              🦥 User is idle
            </p>
          ) : (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              🙋🏻‍♂️ User is active
            </p>
          )}
        </div>
      </div>
    </>
  )
}
