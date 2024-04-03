import Alert from '@ui-components/alert'

export default function FoucFixShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useFoucFix"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useFoucFix
        </h2>
        <Alert
          id="useFoucFix"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
