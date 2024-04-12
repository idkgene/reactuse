import useThrottle from "@hooks/useThrottle";
import { Input } from "@ui-components/input";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function ThrottleShowcase() {
  const [inputValue, setInputValue] = useState<string>("");
  const throttledValue = useThrottle(inputValue, 500);

  useEffect(() => {
    console.log("useThrottle: Throttled value:", throttledValue);
  }, [throttledValue]);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useThrottle">useThrottle</h2>
        <div>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your value"
          />
          <p>Throttled value: {throttledValue}</p>
        </div>
      </div>
    </>
  );
}
