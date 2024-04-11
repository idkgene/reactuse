import React from "react";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { Input } from "@ui-components/input";
import { useState } from "react";

export default function DocumentTitleShowcase() {
  const [title, setTitle] = useState<string>("");

  useDocumentTitle(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useDocumentTitle"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useDocumentTitle
        </h2>
        <Input
          type="text"
          className="mt-3"
          value={title}
          onChange={handleChange}
          maxLength={15}
          id="useDocumentTitle"
          placeholder="Enter a new document title"
        />
        <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Current document title: {title}
        </p>
      </div>
    </>
  );
}
