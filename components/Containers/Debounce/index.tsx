import { useState } from "react";
import { useDebounce } from "@hooks/useDebounce";
import { Input } from "@/components/UI/input";
import styles from "./index.module.css";

export default function DebounceShowcase() {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useDeboune">useDebounce</h2>
        <Input
          className="mt-3"
          type="text"
          id="useDebounce"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something"
          aria-describedby="debouncedValue"
        />
        <p id="debouncedValue">Debounced value: {debouncedValue}</p>
      </div>
    </>
  );
}
