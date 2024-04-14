import React from "react";
import { Input } from "@/components/UI/input";
import { useState } from "react";
import styles from "./index.module.css";

export default function FaviconShowcase() {
  const [faviconUrl, setFaviconUrl] = useState<string>(
    "https://www.w3schools.com/favicon.ico"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaviconUrl(event.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 id="useFavicon">useFavicon</h2>
        <Input
          type="text"
          placeholder="Enter a new favicon URL"
          value={faviconUrl}
          onChange={handleInputChange}
          id="useFavicon"
        />
      </div>
    </>
  );
}
