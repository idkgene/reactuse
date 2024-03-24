"use client"
import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
useDebounce

export default function TestPage() {
  const [inputValue, setInputValue] = useState<string>(""); 
  const debouncedValue = useDebounce(inputValue);

  return (
    <div>
      <input 
        type="text" 
        className="text-black"
        value={inputValue} 
        onChange={e => setInputValue(e.target.value)} 
      />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
}