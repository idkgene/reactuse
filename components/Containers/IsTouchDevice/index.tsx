import { useIsTouchDevice } from "@hooks/useIsTouchDevice";

export default function IsTouchDeviceShowcase() {
  const isTouchDevice = useIsTouchDevice();

  return (
    <>
      <div>
        <h2 id="useIsTouchDevice">useIsTouchDevice</h2>
        <div>
          {isTouchDevice ? (
            <p>👆🏻 Touch Device</p>
          ) : (
            <p>❌ Not a Touch Device</p>
          )}
        </div>
      </div>
    </>
  );
}
