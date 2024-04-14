import Alert from "@/components/UI/alert";
import styles from "./index.module.css";

export default function SessionStorageShowcase() {
  return (
    <>
      <div className={styles.container}>
        <h2 id="useSessionStorage">useSessionStorage</h2>
        <Alert
          id="useSessionStorage"
          message="This preview is under construction."
        />
      </div>
    </>
  );
}
