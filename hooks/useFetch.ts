import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import ky from 'ky';
import got from 'got';
import { useQuery, QueryKey, QueryFunction } from '@tanstack/react-query';

type FetchLibrary = 'axios' | 'ky' | 'got' | 'fetch' | 'react-query';

interface UseFetchOptions extends Partial<AxiosRequestConfig> {
  library?: FetchLibrary;
  queryKey?: QueryKey;
  queryFn?: QueryFunction<any, QueryKey>;
}

interface UseFetchResult<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetch<T = any>(url: string, options: UseFetchOptions = {}): UseFetchResult<T> {
  const { library = 'axios', queryKey, queryFn, ...fetchOptions } = options;
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      switch (library) {
        case 'axios':
          response = await axios.get(url, fetchOptions);
          break;
        case 'ky':
          response = await ky.get(url, fetchOptions).json();
          break;
        case 'got':
          response = await got(url, fetchOptions).json();
          break;
        case 'fetch':
          response = await fetch(url, fetchOptions);
          response = await response.json();
          break;
        case 'react-query':
          if (!queryKey || !queryFn) {
            throw new Error('queryKey and queryFn are required when using react-query');
          }
          const { data: queryData } = await useQuery(queryKey, queryFn);
          response = queryData;
          break;
        default:
          throw new Error('Unsupported fetch library');
      }

      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [url, library, fetchOptions, queryKey, queryFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}