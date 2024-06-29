import React, { useState } from 'react';
import { useDocumentTitle } from './use-document-title';

function UseDocumentTitleDemo() {
  const [initialTitle, setInitialTitle] = useState('My App');
  const [title, setTitle] = useState('Page Title');

  useDocumentTitle(title, { initialTitle });

  return (
    <div>
      <label htmlFor="initialTitleInput">Initial Title:</label>
      <input
        id="initialTitleInput"
        type="text"
        value={initialTitle}
        onChange={(e) => {
          setInitialTitle(e.target.value);
        }}
      />
      <br />
      <label htmlFor="titleInput">Title:</label>
      <input
        id="titleInput"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <h1>{title}</h1>
      <p>The document title should be "{title}"</p>
    </div>
  );
}

export default UseDocumentTitleDemo;
