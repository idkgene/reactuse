import Alert from "@ui-components/alert"

export default function NetworkState() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useNetworkState"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useNetworkState
        </h2>
        <Alert
          id="useNetworkState"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
