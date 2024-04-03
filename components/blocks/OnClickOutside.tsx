import Alert from '@ui-components/alert'

export default function OnClickOutsideShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useOnClickOutside"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useOnCLickOutside
        </h2>
        <Alert
          id="useOnCLickOutside"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
