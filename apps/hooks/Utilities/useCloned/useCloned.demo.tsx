'use client';

import { useCloned } from './useCloned';
import * as React from 'react';

export default function ClonedDemo() {
  const [source, setSource] = React.useState({ name: 'Alice', age: 25 });
  const { cloned, sync } = useCloned(source);

  const updateSource = () => {
    setSource((prev) => ({ ...prev, age: prev.age + 1 }));
  };

  return (
    <div>
      <p>Source: {JSON.stringify(source)}</p>
      <p>Cloned: {JSON.stringify(cloned.current)}</p>
      <button onClick={updateSource}>Update Source</button>
      <button onClick={sync}>Sync Clone</button>
    </div>
  );
}
