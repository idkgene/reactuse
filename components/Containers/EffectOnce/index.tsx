import { useEffectOnce } from "../../../hooks/useEffectOnce";
import styles from "./index.module.css";

export default function UseEffectOnceShowcase() {
  useEffectOnce(() => {
    console.log("useEffectOnce: Effect ran only once");

    return () => {
      console.log("useEffectOnce: Effect cleaned up");
    };
  });

  return (
    <>
      <div className={styles.container}>
        <h2 id="useEffectOnce">useEffectOnce</h2>
        <p>Check the console for the effect and cleanup messages.</p>
      </div>
    </>
  );
}
