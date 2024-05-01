import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { Input } from "../../UI/input";
import styles from "./index.module.css";

export default function DebounceShowcase() {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useDebounce">useDebounce</h2>
        <Input
          className="mt-3"
          type="text"
          id="useDebounce"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something"
          aria-describedby="debouncedValue"
        />
        <p id="debouncedValue" className={styles.p}>
          Debounced value: {debouncedValue}
        </p>
      </div>
    </>
  );
}
