import useMousePosition from '../../hooks/useMousePosition'

export default function MousePositionShowcase() {
  const position = useMousePosition()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useMousePosition"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useMousePosition
        </h2>
        <div
          id="useMousePosition"
          className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <p>
            X: {position.x}, Y: {position.y}
          </p>
        </div>
      </div>
    </>
  )
}
