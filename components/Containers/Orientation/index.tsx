import { useOrientation } from "../../../hooks/@Browser/useOrientation";
import styles from "./index.module.css";

export default function OrientationShowcase() {
  const orientation = useOrientation();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useOrientation">useOrientation</h2>
        <div id="useOrientation">
          <p>Current angle: {orientation.angle}</p>
          <p>Current type: {orientation.type}</p>
        </div>
      </div>
    </>
  );
}
