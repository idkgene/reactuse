'use client';

import React from 'react';
import { useFileDialog } from './use-file-dialog';

const FileUploader: React.FC = () => {
  const { files, open, reset, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: true,
  });

  onChange((selectedFiles) => {
    console.log('Selected files:', selectedFiles);
  });

  return (
    <div>
      <button onClick={open}>Choose Files</button>
      <button onClick={reset}>Reset</button>
      {files ? <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul> : null}
    </div>
  );
};

export default FileUploader;
