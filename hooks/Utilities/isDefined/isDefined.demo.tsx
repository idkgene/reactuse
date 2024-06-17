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
    <div className="container mx-auto p-8">
      <input
        type="text"
        className="border rounded px-3 py-2 mb-4"
        placeholder="Enter a value"
        value={value ?? ''}
        maxLength={10}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClear}>
        Clear Input
      </button>
      <p className="text-lg">
        {isDefined(value)
          ? `The value "${value}" is defined.`
          : 'The value is not defined.'}
      </p>
    </div>
  );
}
