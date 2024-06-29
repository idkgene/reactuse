'use client';

import React, { useState, useCallback } from 'react';
import useBeforeUnload from './use-before-unload';

function BeforeUnloadDemo() {
  const [enablePrompt, setEnablePrompt] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  const shouldPreventUnload = useCallback(() => hasChanges, [hasChanges]);

  useBeforeUnload(shouldPreventUnload, { enabled: enablePrompt });

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1>useBeforeUnload Hook Demo</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={enablePrompt}
            onChange={(e) => {
              setEnablePrompt(e.target.checked);
            }}
          />
          Enable beforeunload prompt
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={hasChanges}
            onChange={(e) => {
              setHasChanges(e.target.checked);
            }}
          />
          Simulate unsaved changes
        </label>
      </div>

      <div style={{ padding: '15px', borderRadius: '5px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Use the checkboxes above to configure the hook.</li>
          <li>Try to close the browser tab or navigate away from this page.</li>
          <li>
            If the prompt is enabled and there are "unsaved changes", you should
            see a warning.
          </li>
          <li>
            Note: The actual message shown is determined by the browser and
            cannot be customized.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default BeforeUnloadDemo;
