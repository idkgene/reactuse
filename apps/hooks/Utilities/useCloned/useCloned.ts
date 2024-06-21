import { useRef, useEffect, useCallback } from 'react';

import { UseClonedOptions, UseClonedReturn } from '../utilities';

/**
 * Clones an object using JSON serialization and deserialization.
 *
 * @param {T} source - The object to be cloned.
 * @returns {T} A deep clone of the input object.
 * @template T - The type of the object to be cloned.
 */
export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}

/**
 * Keeps a cloned reference of a given source object with the option to manually or automatically sync changes.
 *
 * @template T - The type of the source object.
 * @param {T} source - The original source object to be cloned.
 * @param {UseClonedOptions<T>} [options] - Options for customizing the cloning behavior.
 * @param {(source: T) => T} [options.clone=cloneFnJSON] - A function to clone the source object.
 * @param {boolean} [options.manual=false] - Whether to manually control when the clone is updated.
 * @returns {UseClonedReturn<T>} An object containing the cloned reference and a function to sync the clone with the source.
 *
 * @example
 * Basic usage with automatic syncing
 * const { cloned, sync } = useCloned({ name: 'Alice', age: 25 });
 * console.log(cloned.current); // Output: { name: 'Alice', age: 25 }
 */
export function useCloned<T>(
  source: T,
  options?: UseClonedOptions<T>
): UseClonedReturn<T> {
  const cloned = useRef<T>(
    options?.clone ? options.clone(source) : cloneFnJSON(source)
  );
  const { manual = false, clone = cloneFnJSON } = options || {};

  const sync = useCallback(() => {
    cloned.current = clone(source);
  }, [source, clone]);

  useEffect(() => {
    if (!manual) {
      sync();
    }
  }, [source, manual, sync]);

  return { cloned, sync };
}
