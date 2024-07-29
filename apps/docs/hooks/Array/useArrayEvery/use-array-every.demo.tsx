'use client';

import { useState, useMemo } from 'react';
import { useArrayEvery } from './use-array-every';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ArrayEveryDemo(): JSX.Element {
  const [arrayInput, setArrayInput] = useState('1,2,3,4,5');
  const [predicateType, setPredicateType] = useState<
    'even' | 'positive' | 'custom'
  >('even');
  const [customOperator, setCustomOperator] = useState('>');
  const [customValue, setCustomValue] = useState('0');

  const array = useMemo(() => arrayInput.split(',').map(Number), [arrayInput]);

  const predicate = useMemo(() => {
    switch (predicateType) {
      case 'even':
        return (x: number) => x % 2 === 0;
      case 'positive':
        return (x: number) => x > 0;
      case 'custom': {
        const value = Number(customValue);
        switch (customOperator) {
          case '>':
            return (x: number) => x > value;
          case '<':
            return (x: number) => x < value;
          case '>=':
            return (x: number) => x >= value;
          case '<=':
            return (x: number) => x <= value;
          case '==':
            return (x: number) => x === value;
          default:
            return () => false;
        }
      }
      default:
        return () => false;
    }
  }, [predicateType, customOperator, customValue]);

  const everyResult = useArrayEvery(array, predicate);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="arrayInput" className="block text-sm font-medium">
          Input Array (comma-separated numbers):
        </Label>
        <Input
          id="arrayInput"
          value={arrayInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setArrayInput(e.target.value);
          }}
        />
      </div>
      <div>
        <Label className="block text-sm font-medium">Predicate Type:</Label>
        <div className="flex space-x-4">
          {(['even', 'positive', 'custom'] as const).map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`predicate-${type}`}
                checked={predicateType === type}
                onCheckedChange={() => {
                  setPredicateType(type);
                }}
              />
              <Label htmlFor={`predicate-${type}`} className="text-sm">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Label>
            </div>
          ))}
        </div>
      </div>
      {predicateType === 'custom' && (
        <div className="flex space-x-2">
          <div>
            <Label
              htmlFor="customOperator"
              className="block text-sm font-medium"
            >
              Operator:
            </Label>
            <Select value={customOperator} onValueChange={setCustomOperator}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=">">{'>'}</SelectItem>
                <SelectItem value="<">{'<'}</SelectItem>
                <SelectItem value=">=">{'>='}</SelectItem>
                <SelectItem value="<=">{'<='}</SelectItem>
                <SelectItem value="==">==</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="customValue" className="block text-sm font-medium">
              Value:
            </Label>
            <Input
              id="customValue"
              type="number"
              value={customValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCustomValue(e.target.value);
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="block text-sm font-medium">Array:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {JSON.stringify(array, null, 2)}
          </pre>
        </div>
        <div>
          <Label className="block text-sm font-medium">Predicate:</Label>
          <pre className="bg-secondary rounded-md p-2 text-xs">
            {predicateType === 'custom'
              ? `${customOperator} ${customValue}`
              : predicate.toString()}
          </pre>
        </div>
      </div>
      <div>
        <Label className="block text-sm font-medium">Result:</Label>
        <div className="text-lg font-bold">
          {everyResult ? 'TRUE' : 'FALSE'}
        </div>
      </div>
    </div>
  );
}

export default ArrayEveryDemo;
