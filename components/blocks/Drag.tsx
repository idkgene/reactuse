import Alert from '@ui-components/alert'

export default function DragShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useDrag"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useDrag
        </h2>
        <Alert
          id="useDrag"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
