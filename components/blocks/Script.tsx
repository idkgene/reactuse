import Alert from '@ui-components/alert'

export default function ScriptShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useScript"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useScript
        </h2>
        <Alert
          id="useScript"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
