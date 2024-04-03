import React from 'react';
import { useCopyToClipBoard } from '../../hooks/useClipboard';

export default function ClipboardShowcase() {
  const [inputText, setInputText] = React.useState<string>('');
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
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useDeboune"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useClipboard
        </h2>
        <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleCopy}>Copy Text</button>
      {copiedText && <p>Copied Text: {copiedText}</p>}
      </div>
    </>
  )
}
