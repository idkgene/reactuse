import { useIdle } from "../../../hooks/useIdle";
import styles from "./index.module.css";

export default function IdleShowcase() {
  const isIdle = useIdle(60000); // 1 minute

  return (
    <>
      <div className={styles.container}>
        <h2 id="useIdle">useIdle</h2>
        <div>{isIdle ? <p>🦥 User is idle</p> : <p>🙋🏻‍♂️ User is active</p>}</div>
      </div>
    </>
  );
}
