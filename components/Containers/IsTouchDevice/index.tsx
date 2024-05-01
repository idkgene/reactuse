import { useIsTouchDevice } from "../../../hooks/useIsTouchDevice";
import styles from "./index.module.css";

export default function IsTouchDeviceShowcase() {
  const isTouchDevice = useIsTouchDevice();

  return (
    <>
      <div className={styles.container}>
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
