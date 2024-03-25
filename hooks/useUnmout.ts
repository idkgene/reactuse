import { useRef } from "react";
import { useEffectOnce } from "./useEffectOnce";

/**
 * A React hook that allows you to execute a function when a component is unmounted.
 *
 * @param {function} fn - The function to be executed when the component is unmounted.
 * @returns {void}
**/

export const useUnmount = (fn: () => void) => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current())
}

export default useUnmount