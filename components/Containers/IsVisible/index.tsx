import { useIsVisible } from "@hooks/useIsVisible";
import styles from "./index.module.css";

export default function IsVisibleShowcase() {
  const { setRef, inView } = useIsVisible({ threshold: 1 });

  return (
    <>
      <div className={styles.container}>
        <h2>useIntersectionObserver</h2>
        <div ref={setRef}>
          {inView ? (
            <p>✅ The heading is current in view!</p>
          ) : (
            <p>❌ The heading is not in view</p>
          )}
        </div>
      </div>
    </>
  );
}
