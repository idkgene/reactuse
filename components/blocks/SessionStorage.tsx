import Alert from '@ui-components/alert'

export default function SessioStorageShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useSessionStorage"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useSessionStorage
        </h2>
        <Alert
          id="useSessionStorage"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
