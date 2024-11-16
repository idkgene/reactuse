# use-abs

A custom React hook that calculates the absolute value of a number or a function that returns a number.

## Installation

```bash
WIP
```

## Usage

```tsx
const absoluteValue = useAbs(-5);
console.log(absoluteValue); // Output: 5;

const getAbsoluteValue = useAbs(() => -10);
console.log(getAbsoluteValue()); // Output: 10;
```

## API

```
function useAbs(input: number | (() => number)): number | (() => number)
```

If `input` is a number, returns the absolute value of that number.
If `input` is a function, returns a function that, when called, returns the absolute value of the result of the input function.
 