'use client';

import React from 'react';

import { useCopyToClipboard } from './useClipboard';

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <p className="text-lg">Copied Value: {copiedValue || 'None'}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Copy
        </button>
        <button
          onClick={handleCut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cut
        </button>
        <button
          onClick={handlePaste}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Paste
        </button>
      </div>
    </div>
  );
};

export default CopyToClipboardDemo;
