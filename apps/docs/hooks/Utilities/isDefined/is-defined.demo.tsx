'use client';

import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useIsDefined } from './is-defined';

export default function DefinedDemo() {
  const [value, setValue] = useState<string | null | undefined>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setValue(null);
  };

  return (
    <div className="relative mb-[10px] rounded-lg border p-[2em] transition-colors">
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
