import { useOrientation } from '@hooks/useOrientation'

export default function OrientationShowcase() {
  const orientation = useOrientation()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useOrientation"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useOrientation
        </h2>
        <div id="useOrientation">
          <p>Current angle: {orientation.angle}</p>
          <p>Current type: {orientation.type}</p>
        </div>
      </div>
    </>
  )
}
