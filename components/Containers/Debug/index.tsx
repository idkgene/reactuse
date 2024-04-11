import { useDebug } from "@hooks/useDebug";
import styles from "./index.module.css";

export default function DebugShowcase() {
  const isDebugMode = useDebug();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useDebug">useDebug</h2>
        {isDebugMode ? (
          <div>
            <p>🛠️ The application is running in debug mode.</p>
          </div>
        ) : (
          <p>🚀 The application is running in production mode.</p>
        )}
      </div>
    </>
  );
}
