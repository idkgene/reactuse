import { useState } from "react";
import { useDebounce } from "@hooks/useDebounce";
import { Input } from "@/components/UI/input";
import styles from "./index.module.css";
import Section from "../Section/section";

export default function DebounceShowcase() {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <>
      <Section title="useDebounce">
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
      </Section>
    </>
  );
}
