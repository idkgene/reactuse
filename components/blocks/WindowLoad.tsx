import useWindowLoad from '@hooks/useWindowLoad'

export default function WindowLoadShowcase() {
  const isLoaded = useWindowLoad()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useWindowLoad"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useWindowLoad
        </h2>
        <div className="py-6 text-center border-2 border-dashed rounded-lg">
          {isLoaded ? (
            <h1>Window has finished loading!</h1>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  )
}
