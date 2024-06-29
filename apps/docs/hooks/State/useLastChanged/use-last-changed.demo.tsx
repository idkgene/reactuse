'use client';

import { useState } from 'react';
import { useLastChanged } from './use-last-changed';
import { Input } from '@/components/ui/input';

export default function UseLastChangedDemo(): JSX.Element {
  const [source, setSource] = useState('');
  const lastChanged = useLastChanged(source);

  return (
    <div>
      <p>Source: {source}</p>
      <p>
        Last changed:{' '}
        {lastChanged.current
          ? new Date(lastChanged.current).toLocaleString()
          : 'Never'}
      </p>
      <Input
        value={source}
        placeholder="Write something"
        onChange={(e) => {
          setSource(e.target.value);
        }}
      />
    </div>
  );
}
