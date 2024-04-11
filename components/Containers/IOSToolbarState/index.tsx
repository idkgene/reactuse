import { useIOSToolbarState } from "@hooks/useIOSToolbarState";
import styles from "./index.module.css";

export default function IOSToolbarStateShowcase() {
  const { isVisible } = useIOSToolbarState();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useIOSToolbarState">useIOSToolbarState</h2>
        <p>Is iOS toolbar visible? {isVisible ? "✅ Yes" : "❌ No"}</p>
      </div>
    </>
  );
}
