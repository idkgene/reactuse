/**
 * @returns {typeof useEffect | typeof useLayoutEffect} The appropriate effect hook based on the environment.
 */

import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect