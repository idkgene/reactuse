import useWindowResize from '@hooks/useWindowResize'

export default function WindowResizeShowcase() {
  const windowSize = useWindowResize()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useWindowResize"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useWindowResize
        </h2>
        <div>
          <p>Inner Width: {windowSize.innerWidth}</p>
          <p>Inner Height: {windowSize.innerHeight}</p>
          <p>Outer Width: {windowSize.outerWidth}</p>
          <p>Outer Height: {windowSize.outerHeight}</p>
        </div>
      </div>
    </>
  )
}
