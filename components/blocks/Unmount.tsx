import Alert from '@ui-components/alert'

export default function UnmountShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useUnmount"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useUnmount
        </h2>
        <Alert
          id="useUnmount"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
