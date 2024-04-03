import { useDebug } from '@hooks/useDebug'

export default function DebugShowcase() {
  const isDebugMode = useDebug()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useDebug"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useDebug
        </h2>
        {isDebugMode ? (
          <div>
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              🛠️ The application is running in debug mode.
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            🚀 The application is running in production mode.
          </p>
        )}
      </div>
    </>
  )
}
