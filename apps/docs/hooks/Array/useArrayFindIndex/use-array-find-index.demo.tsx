'use client';

import { useState, type ChangeEvent } from 'react';
import { useArrayFindIndex } from './use-array-find-index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

function ArrayFindIndexDemo(): JSX.Element {
  const [fruits, setFruits] = useState(['apple', 'banana', 'cherry']);
  const [searchTerm, setSearchTerm] = useState('banana');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFruit, setNewFruit] = useState('');

  const foundIndex = useArrayFindIndex(fruits, (fruit) =>
    fruit.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        <span>Current fruits:</span>{' '}
        {fruits.length > 0 ? fruits.join(', ') : 'None'}
      </div>
      <div>
        <span className="font-semibold">
          Index of first fruit containing &ldquo;{searchTerm}&rdquo;:
        </span>{' '}
        {foundIndex !== -1 ? foundIndex : 'Not found'}
      </div>
    </>
  );
}

export default ArrayFindIndexDemo;
