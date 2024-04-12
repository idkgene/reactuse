import Alert from "@ui-components/alert";
import styles from "./index.module.css";

export default function KeySequenceShowcase() {
  return (
    <>
      <div className={styles.container}>
        <h2 id="useKeySequence">useKeySequence</h2>
        <Alert
          id="useUpdateEffect"
          message="This preview is under construction."
        />
      </div>
    </>
  );
}
