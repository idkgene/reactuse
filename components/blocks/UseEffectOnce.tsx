import { useEffectOnce } from '@hooks/useEffectOnce'

export default function UseEffectOnceShowcase() {
  useEffectOnce(() => {
    console.log('useEffectOnce: Effect ran only once')

    return () => {
      console.log('useEffectOnce: Effect cleaned up')
    }
  })

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useEffectOnce"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useEffectOnce
        </h2>
        <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Check the console for the effect and cleanup messages.
        </p>
      </div>
    </>
  )
}
