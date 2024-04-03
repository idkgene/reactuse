import { useIsVisible } from '@hooks/useIsVisible'

export default function IsVisibleShowcase() {
  const { setRef, inView } = useIsVisible({ threshold: 1 })

  return (
    <>
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
    </>
  )
}
