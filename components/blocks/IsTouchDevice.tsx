import { useIsTouchDevice } from '@hooks/useIsTouchDevice'

export default function IsTouchDeviceShowcase() {
  const isTouchDevice = useIsTouchDevice()

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useIsTouchDevice"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useIsTouchDevice
        </h2>
        <div>
          {isTouchDevice ? (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              👆🏻 Touch Device
            </p>
          ) : (
            <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ❌ Not a Touch Device
            </p>
          )}
        </div>
      </div>
    </>
  )
}
