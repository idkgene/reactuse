import Alert from '@ui-components/alert'

export default function FetchShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useFetch"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useFetch
        </h2>
        <Alert
          id="useFetch"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
