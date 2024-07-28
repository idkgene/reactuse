'use client';

import { useState, type ChangeEvent } from 'react';
import { useArrayIncludes } from './use-array-includes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

function ArrayIncludesDemo(): JSX.Element {
  const [fruits, setFruits] = useState(['apple', 'banana', 'cherry', 'orange']);
  const [searchTerm, setSearchTerm] = useState('banana');
  const [comparatorType, setComparatorType] = useState('default');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFruit, setNewFruit] = useState('');

  const isIncluded = useArrayIncludes(fruits, searchTerm, {
    comparator:
      comparatorType === 'custom'
        ? (fruit, value) => fruit.includes(value)
        : undefined,
  });

  const handleAddFruit = (): void => {
    if (newFruit) {
      setFruits([...fruits, newFruit]);
      setIsDialogOpen(false);
      setNewFruit('');
    }
  };

  const handleRemoveFruit = (): void => {
    if (fruits.length > 0) {
      setFruits(fruits.slice(0, -1));
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>
        <Label htmlFor="search" className="mr-2 font-semibold">
          Search fruit:
        </Label>
        <Input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter fruit name"
        />
      </div>
      <div className="mt-2">
        <span className="mb-2 font-semibold">Comparator type:</span>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="default"
              checked={comparatorType === 'default'}
              onCheckedChange={() => {
                setComparatorType('default');
              }}
            />
            <Label htmlFor="default" className="text-sm">
              Default
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="custom"
              checked={comparatorType === 'custom'}
              onCheckedChange={() => {
                setComparatorType('custom');
              }}
            />
            <Label htmlFor="custom" className="text-sm">
              Custom (includes)
            </Label>
          </div>
        </div>
      </div>
      <div className="mt-2 flex gap-3">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Fruit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Fruit</DialogTitle>
              <DialogDescription>
                Enter the name of the new fruit to add to the list.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newFruit" className="text-right">
                  Fruit Name
                </Label>
                <Input
                  id="newFruit"
                  value={newFruit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewFruit(e.target.value);
                  }}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddFruit}>
                Add
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  setNewFruit('');
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button type="button" onClick={handleRemoveFruit}>
          Remove Last Fruit
        </Button>
      </div>
      <div className="mt-2">
        <span className="font-semibold">Current fruits:</span>
        {fruits.join(', ')}
      </div>
      <div>
        <span className="font-semibold">
          &quot;{searchTerm}&quot; is included:
        </span>
        {isIncluded ? 'Yes' : 'No'}
      </div>
    </>
  );
}

export default ArrayIncludesDemo;
