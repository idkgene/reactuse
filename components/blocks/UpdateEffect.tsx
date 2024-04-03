import Alert from '@ui-components/alert'

export default function UpdateEffectShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useUpdateEffect"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useUpdateEffect
        </h2>
        <Alert
          id="useUpdateEffect"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
