import { useCopyToClipBoard } from "@hooks/useClipboard";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import React from "react";
import Section from "../Section/Section";

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

  const handleCopyEmpty = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    copyText("");
  };

  return (
    <>
      <Section title="useClipboard">
        <Input type="text" value={inputText} onChange={handleInputChange} />
        <div className="flex gap-2">
          <Button onClick={handleCopy} className="w-fit">
            Copy Text
          </Button>
          <Button onClick={handleCopyEmpty} className="w-fit">
            Clear Clipboard
          </Button>
        </div>
        {copiedText && <p>✔️ Copied Text: {copiedText}</p>}
      </Section>
    </>
  );
}
