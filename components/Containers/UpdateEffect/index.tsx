import { useUpdateEffect } from "@hooks/useUpdateEffect";
import { useCallback, useState } from "react";
import styles from "./index.module.css";

export default function UpdateEffectShowcase() {
  const [count, setCount] = useState(0);

  const handleUpdateEffect = useCallback(() => {
    console.log("Effect triggered");
  }, []);

  useUpdateEffect(handleUpdateEffect, [count]);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useUpdateEffect">useUpdateEffect</h2>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Count {count}</p>
      </div>
    </>
  );
}
