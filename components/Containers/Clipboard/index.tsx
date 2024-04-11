import { useCopyToClipBoard } from "@hooks/useClipboard";
import { Button } from "@ui-components/button";
import { Input } from "@ui-components/input";
import React from "react";
import styles from "./index.module.css";

export default function ClipboardShowcase() {
  const [inputText, setInputText] = React.useState<string>("");
  const [copiedText, copyText] = useCopyToClipBoard();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    copyText(inputText);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 id="useClipboard">useClipboard</h2>
        <Input type="text" value={inputText} onChange={handleInputChange} />
        <Button onClick={handleCopy} className="w-fit">
          Copy Text
        </Button>
        {copiedText && <p>Copied Text: {copiedText}</p>}
      </div>
    </>
  );
}
