import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function IntersectionObserverShowcase() {
  const observerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(observerRef, {
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry) {
      console.log(
        `useIntersectionObserver: Element is ${
          entry.isIntersecting ? "visible" : "hidden"
        }`
      ); //unneccessary
    }
  }, [entry]);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useIntersectionObserver">useIntersectionObserver</h2>
        <div ref={observerRef}>
          <p>
            ⬇️ Scroll this element into view to see it logged to the console. l
            this element into view to see it logged to the console.
          </p>
        </div>
      </div>
    </>
  );
}
