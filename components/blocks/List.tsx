import { useList } from '@hooks/useList'
import { Button } from '@ui-components/button'

export default function ListShowcase() {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] =
    useList<number>([1, 2, 3])

  if (Array.isArray(list)) {
    return (
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useList"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useList
        </h2>
        <div className="flex flex-col gap-2">
          <ul>
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Button
            type="button"
            onClick={() => set([4, 5, 6])}
            className="w-fit"
          >
            Set List
          </Button>
          <Button
            type="button"
            onClick={() => push(7)}
            className="w-fit"
          >
            Push 7
          </Button>
          <Button
            type="button"
            onClick={() => removeAt(1)}
            className="w-fit"
          >
            Remove at index 1
          </Button>
          <Button
            type="button"
            onClick={() => insertAt(1, 8)}
            className="w-fit"
          >
            Insert 8 at index 1
          </Button>
          <Button
            type="button"
            onClick={() => updateAt(2, 9)}
            className="w-fit"
          >
            Update at index 2
          </Button>
          <Button
            type="button"
            onClick={clear}
            className="w-fit"
          >
            Clear List
          </Button>
        </div>
      </div>
    )
  }

  return null
}
