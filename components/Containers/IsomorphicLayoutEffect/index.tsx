import { useIsomorphicLayoutEffect } from "@hooks/useIsomorphicLayoutEffect";
import styles from "./index.module.css";

export default function IsomorphicLayoutEffect() {
  useIsomorphicLayoutEffect(() => {
    console.log("Isomorphic layout effect triggered");
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useIsomorphicLayoutEffect">useIsomorphicLayoutEffect</h2>
        <p>Check console for effect trigger</p>
      </div>
    </>
  );
}
