import { useWindowSize } from "@/hooks/useWindowSize";
import styles from "./index.module.css";

export default function WindowSizeShowcase() {
  const windowSize = useWindowSize();

  return (
    <div className={styles.container}>
      <h2 id="useWindowSize">useWindowSize</h2>
      <div>
        <p>Window Size {JSON.stringify(windowSize)}</p>
      </div>
    </div>
  );
}
