import useUnmount from "../../../hooks/useUnmout";
import styles from "./index.module.css";

export default function UnmountShowcase() {
  useUnmount(() => {
    console.log("useUnmount: Component is about to be unmounted!");
  });

  return (
    <>
      <div className={styles.container}>
        <h2 id="useUnmount">useUnmount</h2>
        <div>
          There&apos;s a message in the console indicating that the component is
          about to be unmounted.
        </div>
      </div>
    </>
  );
}
