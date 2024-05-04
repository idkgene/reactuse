import React from "react";
import { useDocumentTitle } from "../../../hooks/@Browser/useDocumentTitle";
import { useState } from "react";
import styles from "./index.module.css";
import { Input } from "@/components/UI/input";

export default function DocumentTitleShowcase() {
  const [title, setTitle] = useState<string>("");

  useDocumentTitle(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 id="useDocumentTitle">useDocumentTitle</h2>
        <Input
          type="text"
          className="mt-3"
          value={title}
          onChange={handleChange}
          maxLength={15}
          id="useDocumentTitle"
          placeholder="Enter a new document title"
        />
        <p>Current document title: {title}</p>
      </div>
    </>
  );
}
