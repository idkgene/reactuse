'use client';

import { useState, useMemo } from 'react';
import { useArrayDifference } from './use-array-difference';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Person {
  id: number;
  name: string;
}

function ArrayDifferenceDemo(): JSX.Element {
  const list: Person[] = useMemo(
    () => [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ],
    [],
  );

  const values: Person[] = useMemo(
    () => [
      { id: 2, name: 'Bobby' },
      { id: 3, name: 'Charles' },
    ],
    [],
  );

  const [useKeySelector, setUseKeySelector] = useState(false);
  const [useComparator, setUseComparator] = useState(false);

  const keySelector = useKeySelector ? (item: Person) => item.id : undefined;
  const comparator = useComparator
    ? (a: Person, b: Person) => a.id === b.id && a.name.startsWith(b.name[0])
    : undefined;

  const difference = useArrayDifference(list, values, keySelector, comparator);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="block text-sm font-medium">List:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(list, null, 1)}
          </pre>
        </div>
        <div>
          <Label className="block text-sm font-medium">
            Values to exclude:
          </Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(values, null, 1)}
          </pre>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useKeySelector"
            checked={useKeySelector}
            onCheckedChange={(checked) => {
              setUseKeySelector(checked as boolean);
            }}
          />
          <Label htmlFor="useKeySelector" className="text-sm">
            Use Key Selector (id only)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useComparator"
            checked={useComparator}
            onCheckedChange={(checked) => {
              setUseComparator(checked as boolean);
            }}
          />
          <Label htmlFor="useComparator" className="text-sm">
            Use Comparator (id and first letter)
          </Label>
        </div>
      </div>
      <div>
        <Label className="block text-sm font-medium">Difference:</Label>
        <pre className="bg-secondary rounded-md p-2 text-xs">
          {JSON.stringify(difference, null, 1)}
        </pre>
      </div>
    </div>
  );
}

export default ArrayDifferenceDemo;
