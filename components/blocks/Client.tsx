import { useIsClient } from '@hooks/useIsClient'

export default function ClientShowcase() {
  const isClient = useIsClient()
  
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useIsClient"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useIsClient
        </h2>
        <div>
          {isClient ? (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              💻 Running on the client-side
            </p>
          ) : (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              🗄️ Running on the server-side
            </p>
          )}
        </div>
      </div>
    </>
  )
}
