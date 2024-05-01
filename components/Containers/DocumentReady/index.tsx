import { useDocumentReadyState } from "../../../hooks/useDocumentReadyState";
import styles from "./index.module.css";

export default function DocumentReadyShowCase() {
  const readyState = useDocumentReadyState();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useDocumentReadyState">useDocumentReadyState</h2>
        <p>Current ready state: {readyState}</p>
        {readyState === "loading" && <p>⌛ The document is still loading.</p>}
        {readyState === "interactive" && (
          <p>
            🕹️ The document has finished parsing but is still loading
            sub-resources.
          </p>
        )}
        {readyState === "complete" && (
          <p>✅ The document and all sub-resources have finished loading.</p>
        )}
      </div>
    </>
  );
}
