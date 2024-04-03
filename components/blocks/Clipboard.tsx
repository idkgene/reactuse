import { useCopyToClipBoard } from '@hooks/useClipboard';
import { Button } from '@ui-components/button';
import { Input } from '@ui-components/input';
import React from 'react';

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
        <Input type="text" value={inputText} onChange={handleInputChange} />
      <Button onClick={handleCopy}>Copy Text</Button>
      {copiedText && <p>Copied Text: {copiedText}</p>}
      </div>
    </>
  )
}
