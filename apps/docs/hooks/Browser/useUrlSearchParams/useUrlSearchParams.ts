import { useCallback, useEffect, useMemo, useState } from 'react';

export type UrlParams = Record<string, string[] | string>;

export interface UseUrlSearchParamsOptions<T> {
  removeNullishValues?: boolean;
  removeFalsyValues?: boolean;
  initialValue?: T;
  write?: boolean;
}

export function useUrlSearchParams<T extends Record<string, any> = UrlParams>(
  mode: 'history' | 'hash' | 'hash-params' = 'history',
  options: UseUrlSearchParamsOptions<T> = {},
): T {
  const {
    removeNullishValues = true,
    removeFalsyValues = false,
    initialValue = {} as T,
    window = globalThis.window,
    write = true,
  } = options;

  const [params, setParams] = useState<T>(() => {
    const searchParams = new URLSearchParams(
      mode === 'hash-params'
        ? window.location.hash.slice(1)
        : mode === 'hash'
          ? window.location.hash.split('?')[1] ?? ''
          : window.location.search,
    );

    const initialParams = {} as T;
    for (const key of searchParams.keys()) {
      const values = searchParams.getAll(key);
      initialParams[key as keyof T] = values.length > 1 ? values : values[0];
    }

    return { ...initialValue, ...initialParams };
  });

  const update = useCallback(
    (newParams: T) => {
      const searchParams = new URLSearchParams(
        mode === 'hash-params'
          ? window.location.hash.slice(1)
          : mode === 'hash'
            ? window.location.hash.split('?')[1] ?? ''
            : window.location.search,
      );

      for (const key in newParams) {
        const value = newParams[key];
        if (removeNullishValues && value == null) {
          searchParams.delete(key);
        } else if (removeFalsyValues && !value) {
          searchParams.delete(key);
        } else if (Array.isArray(value)) {
          searchParams.delete(key);
          value.forEach((v) => { searchParams.append(key, v); });
        } else {
          searchParams.set(key, value);
        }
      }

      const newSearchString = searchParams.toString();
      const [pathname, hash] =
        mode === 'hash-params'
          ? window.location.hash.split('#')
          : mode === 'hash'
            ? window.location.hash.split('?')
            : [window.location.pathname, window.location.hash];

      if (write) {
        window.history.pushState(
          null,
          '',
          mode === 'hash-params'
            ? `${pathname}#${newSearchString}${hash ? `#${hash}` : ''}`
            : mode === 'hash'
              ? `${pathname}#${hash ? `${hash}&` : ''}${newSearchString}`
              : `${pathname}?${newSearchString}${hash}`,
        );
      }

      setParams(newParams);
    },
    [mode, removeNullishValues, removeFalsyValues, write],
  );

  const proxy = useMemo(
    () =>
      new Proxy(params, {
        set(target, prop, value) {
          update({ ...target, [prop]: value });
          return true;
        },
      }),
    [params, update],
  );

  useEffect(() => {
    const handlePopstate = () => {
      const searchParams = new URLSearchParams(
        mode === 'hash-params'
          ? window.location.hash.slice(1)
          : mode === 'hash'
            ? window.location.hash.split('?')[1] ?? ''
            : window.location.search,
      );

      const newParams = {} as T;
      for (const key of searchParams.keys()) {
        const values = searchParams.getAll(key);
        newParams[key as keyof T] = values.length > 1 ? values : values[0];
      }

      setParams(newParams);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [mode]);

  return proxy;
}
