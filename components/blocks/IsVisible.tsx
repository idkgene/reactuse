import { useIsVisible } from '@hooks/useIsVisible'

export default function IsVisibleShowcase() {
  const { setRef, inView } = useIsVisible({ threshold: 1 })

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2 className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          useIntersectionObserver
        </h2>
        <div
          ref={setRef}
          className="py-6 text-center border-2 border-dashed rounded-lg"
        >
          {inView ? (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ✅ The heading is current in view!
            </p>
          ) : (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ❌ The heading is not in view
            </p>
          )}
        </div>
      </div>
    </>
  )
}
