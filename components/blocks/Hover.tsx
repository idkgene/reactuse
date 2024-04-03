import { useHover } from '../../hooks/useHover'

export default function HoverShowase() {
  const [hoverRef, isHovered] = useHover<HTMLElement | any>()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useHover"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useHover
        </h2>
        <div
          ref={hoverRef}
          className="py-6 text-center border-2 border-dashed rounded-lg"
        >
          {isHovered ? (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ✅ Hovered
            </p>
          ) : (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ❌ Not Hovered
            </p>
          )}
        </div>
      </div>
    </>
  )
}
