import Alert from '@ui-components/alert'

export default function GeolocationShowcase() {
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useGeolocation"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useGeolocation
        </h2>
        <Alert
          id="useGeolocation"
          message="This preview is under construction."
        />
      </div>
    </>
  )
}
