'use client';

import { useState } from 'react';
import { isDefined } from './isDefined';

export default function DefinedDemo() {
  const [value, setValue] = useState<string | null | undefined>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setValue(null);
  };

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <input
        type="text"
        className="border rounded px-3 py-2 mr-2"
        placeholder="Enter a value"
        value={value ?? ''}
        maxLength={10}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleClear}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Clear Input
      </button>
      <p>
        {isDefined(value)
          ? `The value "${value}" is defined.`
          : 'The value is not defined.'}
      </p>
    </div>
  );
}
