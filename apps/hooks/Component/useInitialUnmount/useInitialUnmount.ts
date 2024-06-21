import { useEffect } from 'react';

/**
 * React hook that allows you to run a callback function when a component unmounts.
 *
 * @param {() => void} callback - The callback function to be executed when the component unmounts.
 *
 * @returns {void}
 *
 * @example
 * useInitialUnmount(() => {
 *    console.log('Component is unmounting');
 * });
 */
export const useInitialUnmount = (callback: () => void) => {
  useEffect(() => callback, []);
};
