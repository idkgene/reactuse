import { useFirstMountState } from "../../../hooks/useFirstMountState";
import styles from "./index.module.css";

export default function FirstMountStateShowcase() {
  const isFirstMount = useFirstMountState();
  return (
    <>
      <div className={styles.container}>
        <h2 id="useFirstMountState">useFirstMountState</h2>
        <div>
          {isFirstMount ? <p>🥇 First render</p> : <p>🔜 Subsequent render</p>}
        </div>
      </div>
    </>
  );
}
