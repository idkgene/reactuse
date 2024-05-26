/**
 * @returns {typeof useEffect | typeof useLayoutEffect} The appropriate effect hook based on the environment.
 */

import React, { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void => {
  const effectToUse =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  effectToUse(effect, deps);
};