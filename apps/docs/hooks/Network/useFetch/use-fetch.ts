import { useCallback, useEffect, useRef, useState } from 'react';

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  refetch?: boolean;
  immediate?: boolean;
  timeout?: number;
  beforeFetch?: (
    ctx: BeforeFetchContext,
  ) => Promise<FetchContext | void> | FetchContext | void;
  afterFetch?: (
    ctx: AfterFetchContext,
  ) => Promise<AfterFetchContext> | AfterFetchContext;
  onFetchError?: (
    ctx: FetchErrorContext,
  ) => Promise<FetchErrorContext> | FetchErrorContext;
  updateDataOnError?: boolean;
}

interface FetchContext {
  url: string;
  options: RequestInit;
  cancel?: () => void;
}

type BeforeFetchContext = FetchContext

interface AfterFetchContext {
  response: Response;
  data: any;
}

interface FetchErrorContext {
  error: Error;
  data: any;
}

interface UseFetchReturn<T> {
  data: T | null;
  isFetching: boolean;
  error: Error | null;
  statusCode: number | null;
  canAbort: boolean;
  execute: () => Promise<void>;
  abort: () => void;
  onFetchResponse: (callback: (response: Response) => void) => void;
  onFetchError: (callback: (error: Error) => void) => void;
}

export function useFetch<T>(
  url: string,
  options: FetchOptions = {},
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(
    options.immediate ?? true,
  );
  const [error, setError] = useState<Error | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [canAbort, setCanAbort] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const onFetchResponseCallbacks = useRef<((response: Response) => void)[]>(
    [],
  );
  const onFetchErrorCallbacks = useRef<((error: Error) => void)[]>([]);

  const execute = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    setStatusCode(null);
    setCanAbort(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const ctx: FetchContext = {
      url,
      options: {
        method: options.method ?? 'GET',
        headers: options.headers ?? {},
        body: options.body ?? null,
        signal: abortController.signal,
      },
    };

    if (options.beforeFetch) {
      const newCtx = await options.beforeFetch(ctx);
      if (newCtx) Object.assign(ctx, newCtx);
    }

    try {
      const response = await fetch(ctx.url, ctx.options);
      const data = await response.json();
      if (options.afterFetch) {
        const newCtx = await options.afterFetch({
          response,
          data,
        } as AfterFetchContext);
        setData(newCtx.data);
      } else {
        setData(data);
      }
      setStatusCode(response.status);
      onFetchResponseCallbacks.current.forEach((callback) =>
        { callback(response); },
      );
    } catch (err) {
      const fetchError = err as Error;
      const errorCtx: FetchErrorContext = { error: fetchError, data: null };
      if (options.onFetchError) {
        const newCtx = await options.onFetchError(errorCtx);
        setData(newCtx.data);
        setError(newCtx.error);
      } else {
        setError(fetchError);
      }
      if (options.updateDataOnError) {
        setData(errorCtx.data);
      }
      onFetchErrorCallbacks.current.forEach((callback) => { callback(fetchError); });
    } finally {
      setIsFetching(false);
      setCanAbort(false);
      abortControllerRef.current = null;
    }
  }, [
    url,
    options,
    setData,
    setError,
    setStatusCode,
    onFetchResponseCallbacks,
    onFetchErrorCallbacks,
  ]);

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setCanAbort(false);
    }
  };

  const onFetchResponse = (callback: (response: Response) => void) => {
    onFetchResponseCallbacks.current.push(callback);
  };

  const onFetchError = (callback: (error: Error) => void) => {
    onFetchErrorCallbacks.current.push(callback);
  };

  useEffect(() => {
    if (options.immediate ?? true) {
      execute();
    }

    return () => {
      abort();
    };
  }, [url, options.refetch, execute, options.immediate]);

  useEffect(() => {
    if (options.timeout) {
      const timeoutId = setTimeout(() => {
        if (canAbort) {
          abort();
        }
      }, options.timeout);
      return () => { clearTimeout(timeoutId); };
    }
  }, [canAbort, options.timeout]);

  return {
    data,
    isFetching,
    error,
    statusCode,
    canAbort,
    execute,
    abort,
    onFetchResponse,
    onFetchError,
  };
}

interface CreateFetchOptions {
  baseUrl?: string;
  combination?: 'overwrite' | 'chain';
  options?: FetchOptions;
  fetchOptions?: RequestInit;
}

export function createFetch({
  baseUrl = '',
  combination = 'chain',
  options: globalOptions = {},
  fetchOptions: globalFetchOptions = {},
}: CreateFetchOptions) {
  return function useCustomFetch<T>(
    url: string,
    localOptions: FetchOptions = {},
  ): UseFetchReturn<T> {
    let combinedOptions: FetchOptions;

    if (combination === 'overwrite') {
      combinedOptions = { ...globalOptions, ...localOptions };
    } else {
      combinedOptions = {
        ...globalOptions,
        ...localOptions,
        headers: {
          ...globalOptions.headers,
          ...localOptions.headers,
        },
      };
    }

    const fullUrl = baseUrl ? `${baseUrl}${url}` : url;

    return useFetch<T>(fullUrl, { ...combinedOptions, ...globalFetchOptions });
  };
}
