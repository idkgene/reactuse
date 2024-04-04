import { useIOSToolbarState } from '../../hooks/useIOSToolbarState'

export default function IOSToolbarStateShowcase() {
  const { isVisible } = useIOSToolbarState()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useIOSToolbarState"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useIOSToolbarState
        </h2>
        <p>Is iOS toolbar visible? {isVisible ? '✅ Yes' : '❌ No'}</p>
      </div>
    </>
  )
}
