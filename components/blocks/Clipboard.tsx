import Alert from '@ui-components/alert'

export default function ClipboardShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useDeboune"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useClipboard
        </h2>
        <Alert
          id="useClipboard"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
