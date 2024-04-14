# `useKeySequence`

Unleash the power of keyboard shortcuts in your React components with the sleek and intuitive `useKeySequence` hook! ⌨️✨

## Usage

```tsx
import { useKeySequence } from "./useKeySequence";

const MyComponent = () => {
  useKeySequence({
    sequence: "abc",
    callback: () => {
      console.log("Secret sequence triggered!");
    },
    eventType: "keyup",
    keystrokeDelay: 500,
  });

  return <div>Press the secret sequence to trigger the callback!</div>;
};
```

## Reference

```tsx
/**
 * @interface UseKeySequenceOptions
 * @property {string} sequence - The key sequence to listen for.
 * @property {() => void} callback - The callback function to be executed when the key sequence is detected.
 * @property {('keydown' | 'keyup')} [eventType='keydown'] - The event type to listen for ('keydown' or 'keyup').
 * @property {number} [keystrokeDelay=1000] - The maximum delay (in milliseconds) between keystrokes in the sequence.
 */

export interface UseKeySequenceOptions {
  sequence: string;
  callback: () => void;
  eventType?: "keydown" | "keyup";
  keystrokeDelay?: number;
}

/**
 * @param {UseKeySequenceOptions} options - An object containing the options for the hook.
 * @returns {null} The hook does not return any value.
 */
export const useKeySequence: (options: UseKeySequenceOptions) => null;
```
