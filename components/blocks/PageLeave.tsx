import Alert from '@ui-components/alert'

export default function PageLeaveShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="usePageLeave"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          usePageLeave
        </h2>
        <Alert
          id="usePageLeave"
          message="This section is under construction"
        />
      </div>
    </>
  )
}
