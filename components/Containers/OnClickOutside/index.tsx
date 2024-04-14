import Alert from "@/components/UI/alert";
import styles from "./index.module.css";

export default function OnClickOutsideShowcase() {
  return (
    <>
      <div className={styles.container}>
        <h2 id="useOnClickOutside">useOnCLickOutside</h2>
        <Alert
          id="useOnCLickOutside"
          message="This preview is under construction."
        />
      </div>
    </>
  );
}
