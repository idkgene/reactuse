import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">useCopyToClipBoard Hook</h1>

      <p className="mb-4">
        The <code>useCopyToClipBoard</code> hook is a custom React hook that
        provides a convenient way to copy text to the clipboard. It returns a
        tuple containing the copied text and a function to copy new text to the
        clipboard.
      </p>

      <h2 className="text-2xl font-bold mb-2">Usage</h2>

      <SyntaxHighlighter language="jsx" style={dracula}>
        {`import { useCopyToClipBoard } from '../hooks/useClipboard';

function MyComponent() {
  const [copiedText, copyText] = useCopyToClipBoard();

  const handleCopy = () => {
    const textToCopy = 'Hello, World!';
    copyText(textToCopy);
  };

  return (
    <div>
      <button onClick={handleCopy}>Copy Text</button>
      {copiedText && <p>Copied Text: {copiedText}</p>}
    </div>
  );
}`}
      </SyntaxHighlighter>

      <p className="mb-4">
        To use the hook, import it into your React component and call it within
        the component function. The hook returns a tuple with two values:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>
          <code>copiedText</code>: A string representing the text that was last
          copied to the clipboard. This value will be an empty string if nothing
          has been copied yet.
        </li>
        <li>
          <code>copyText</code>: A function that takes a string as an argument
          and copies it to the clipboard. If the copying operation is
          successful, it updates the `copiedText` value with the copied text.
        </li>
      </ul>

      <p className="mb-4">
        Here's an example of how to use the `useCopyToClipBoard` hook in a React
        component:
      </p>

      <h2 className="text-2xl font-bold mb-2">Example</h2>

      <SyntaxHighlighter language="jsx" style={dracula}>
        {`import React, { useState } from 'react';
import { useCopyToClipBoard } from '../hooks/useClipboard';

const ClipboardExample = () => {
  const [inputText, setInputText] = useState('');
  const [copiedText, copyText] = useCopyToClipBoard();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCopy = () => {
    copyText(inputText);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleCopy}>Copy Text</button>
      {copiedText && <p>Copied Text: {copiedText}</p>}
    </div>
  );
};

export default ClipboardExample;`}
      </SyntaxHighlighter>
    
    <p>In this example, the `useCopyToClipBoard` hook is used to copy text to the clipboard. The `copiedText` value is updated with the copied text when the copy operation is successful. The `copyText` function is called when the user clicks the "Copy Text" button, and the copied text is displayed in the UI.</p>
    </div>
  );
};

export default page;
