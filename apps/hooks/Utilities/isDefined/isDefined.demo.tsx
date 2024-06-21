'use client';

import { useState } from 'react';
import { isDefined } from './isDefined';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
      <Input
        type="text"
        placeholder="Enter a value"
        className="mb-4"
        value={value ?? ''}
        maxLength={10}
        onChange={handleChange}
      />
      <Button type="button" onClick={handleClear}>
        Clear Input
      </Button>
      <p>
        {isDefined(value)
          ? `The value "${value}" is defined.`
          : 'The value is not defined.'}
      </p>
    </div>
  );
}
