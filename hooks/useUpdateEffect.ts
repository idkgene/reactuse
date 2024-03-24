import { useEffect } from "react";
import { useFirstMountState } from "./useFirstMountState";

/**
 * A custom React hook that runs an effect function only when the component updates, after the initial render.
 *
 * @param {() => void | (() => void)} effect - The effect function to be executed after the initial render.
 * @param {readonly any[]} [deps=[]] - An optional array of dependencies for the effect function.
 */

export const useUpdateEffect: typeof useEffect = (effect, deps = []) => {
  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, isFirstMount, ...deps])
}
