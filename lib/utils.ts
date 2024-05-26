import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Clones an object using JSON serialization and deserialization.
 *
 * @param {T} source - The object to be cloned.
 * @returns {T} A deep clone of the input object.
 * @template T - The type of the object to be cloned.
 */
export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}