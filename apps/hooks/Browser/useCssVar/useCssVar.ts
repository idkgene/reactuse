import { useEffect, useRef, useState } from 'react';

interface UseCssVarOptions {
  initialValue?: string;
  observe?: boolean;
}

export function useCssVar(
  prop: string | (() => string),
  target?: React.RefObject<HTMLElement>,
  options?: UseCssVarOptions
): string {
  const { initialValue = '', observe = false } = options || {};
  const [value, setValue] = useState(initialValue);
  const propRef = useRef(typeof prop === 'function' ? prop() : prop);
  const targetRef = useRef(target?.current ?? document.documentElement);

  useEffect(() => {
    const resolvedProp = typeof prop === 'function' ? prop() : prop;
    propRef.current = resolvedProp;
  }, [prop]);

  useEffect(() => {
    targetRef.current = target?.current ?? document.documentElement;
  }, [target]);

  useEffect(() => {
    const computedStyle = window.getComputedStyle(targetRef.current);
    const initialValue = computedStyle.getPropertyValue(propRef.current).trim();
    setValue(initialValue);
  }, []);

  useEffect(() => {
    const element = targetRef.current;

    if (element instanceof HTMLElement) {
      element.style.setProperty(propRef.current, value);
    }
  }, [value]);

  useEffect(() => {
    if (!observe) return;

    const element = targetRef.current;

    if (!(element instanceof HTMLElement)) return;

    const observer = new MutationObserver(() => {
      const computedStyle = window.getComputedStyle(element);
      const newValue = computedStyle.getPropertyValue(propRef.current).trim();
      setValue(newValue);
    });

    observer.observe(element, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, [observe]);

  return value;
}
