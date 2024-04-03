import Alert from '@ui-components/alert'

export default function ListShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useList"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useList
        </h2>
        <Alert
          id="useList"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
