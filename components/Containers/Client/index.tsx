import { useIsClient } from "@hooks/useIsClient";
import styles from "./index.module.css";

export default function ClientShowcase() {
  const isClient = useIsClient();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useIsClient">useIsClient</h2>
        <div>
          {isClient ? (
            <p>💻 Running on the client-side</p>
          ) : (
            <p>🗄️ Running on the server-side</p>
          )}
        </div>
      </div>
    </>
  );
}
