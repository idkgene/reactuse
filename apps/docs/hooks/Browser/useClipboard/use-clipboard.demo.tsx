'use client';

import React from 'react';
import { useCopyToClipboard } from './use-clipboard';

const CopyToClipboardDemo: React.FC = () => {
  const { copiedValue, copy, cut, paste } = useCopyToClipboard();

  const handleCopy = async () => {
    const result = await copy('Hello, World!');
    alert(result ? 'Copied!' : 'Failed to copy');
  };

  const handleCut = async () => {
    const result = await cut('Hello, World!');
    alert(result ? 'Cut!' : 'Failed to cut');
  };

  const handlePaste = async () => {
    const pastedText = await paste();
    alert(pastedText ? `Pasted: ${pastedText}` : 'Failed to paste');
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4">
        <p className="text-lg">Copied Value: {copiedValue || 'None'}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleCopy}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Copy
        </button>
        <button
          onClick={handleCut}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Cut
        </button>
        <button
          onClick={handlePaste}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Paste
        </button>
      </div>
    </div>
  );
};

export default CopyToClipboardDemo;
