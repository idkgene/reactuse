import Alert from '@ui-components/alert'

export default function MediaQueryShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useMediaQuery"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useMediaQuery
        </h2>
        <Alert
          id="useMediaQuery"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
