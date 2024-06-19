import React, { useState, useRef, useCallback } from 'react';

interface UseMutationOptions<Data> {
  retry?: boolean | number;
  onSuccess?: (data: Data) => void;
  onError?: (error: Error) => void;
}

interface UseMutationState<Data> {
  data: Data | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface UseMutationReturn<Body, Data> extends UseMutationState<Data> {
  mutate: (body: Body) => void;
  mutateAsync: (body: Body) => Promise<Data>;
}

const resolveRetry = (retry: boolean | number): number => (typeof retry === 'boolean' ? (retry ? 1 : 0) : Math.max(0, retry));

export const useMutation = <Body, Data>(
  callback: (body: Body) => Promise<Data>,
  options?: UseMutationOptions<Data>
): UseMutationReturn<Body, Data> => {
  const retryCountRef = useRef(resolveRetry(options?.retry ?? 0));

  const [state, setState] = useState<UseMutationState<Data>>({
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const executeMutation = useCallback(
    async (body: Body, retriesLeft: number): Promise<Data> => {
      setState((prevState) => ({ ...prevState, isLoading: true, isError: false, isSuccess: false, error: null }));

      try {
        const result = await callback(body);
        options?.onSuccess?.(result);
        setState({ data: result, error: null, isLoading: false, isError: false, isSuccess: true });
        return result;
      } catch (error) {
        if (retriesLeft > 0) {
          return executeMutation(body, retriesLeft - 1);
        }

        const err = error as Error;
        options?.onError?.(err);
        setState({ data: null, error: err, isLoading: false, isError: true, isSuccess: false });
        throw err;
      }
    },
    [callback, options]
  );

  const mutate = useCallback((body: Body) => {
    executeMutation(body, retryCountRef.current).catch(() => {});
  }, [executeMutation]);

  const mutateAsync = useCallback((body: Body): Promise<Data> => {
    return executeMutation(body, retryCountRef.current);
  }, [executeMutation]);

  return {
    ...state,
    mutate,
    mutateAsync,
  };
};