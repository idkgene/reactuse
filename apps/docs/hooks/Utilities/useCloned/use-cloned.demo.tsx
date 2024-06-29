'use client';

import { useState } from 'react';
import { useCloned } from './use-cloned';

export default function ClonedDemo(): JSX.Element {
  const [source, setSource] = useState({ name: 'Alice', age: 25 });
  const { cloned, sync } = useCloned(source);

  const updateSource = (): void => {
    setSource((prev) => ({ ...prev, age: prev.age + 1 }));
  };

  return (
    <div>
      <p>Source: {JSON.stringify(source)}</p>
      <p>Cloned: {JSON.stringify(cloned?.current)}</p>
      <button type="button" onClick={updateSource}>
        Update Source
      </button>
      <button type="button" onClick={sync}>
        Sync Clone
      </button>
    </div>
  );
}
