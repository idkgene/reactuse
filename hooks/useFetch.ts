import { QueryClient, QueryFunction, QueryKey } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import ky, { Options as KyOptions } from 'ky'
import { useCallback, useEffect, useState } from 'react'

type FetchLibrary = 'axios' | 'ky' | 'fetch' | 'react-query'

interface UseFetchOptions<TData> {
  library?: FetchLibrary
  queryKey?: QueryKey
  queryFn?: QueryFunction<TData>
  axiosOptions?: AxiosRequestConfig
  kyOptions?: KyOptions
  fetchOptions?: RequestInit
}

interface UseFetchResult<TData> {
  data: TData | undefined
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * @param url - The URL to fetch data from.
 * @param options - An optional object containing configuration options for the fetch operation.
 * @param options.library - The HTTP client library to use for the fetch operation. Can be 'axios', 'ky', 'fetch', or 'react-query'. Defaults to 'axios'.
 * @param options.queryKey - The query key to use when using the 'react-query' library. Required when using 'react-query'.
 * @param options.queryFn - The query function to use when using the 'react-query' library. Required when using 'react-query'.
 * @param options.axiosOptions - An object containing options to be passed to the Axios library when using the 'axios' library.
 * @param options.kyOptions - An object containing options to be passed to the Ky library when using the 'ky' library.
 * @param options.fetchOptions - An object containing options to be passed to the Fetch API when using the 'fetch' library.
 *
 * @returns An object with the following properties:
 * - `data`: The fetched data, or `undefined` if the fetch operation is still in progress or has failed.
 * - `loading`: A boolean indicating whether the fetch operation is still in progress.
 * - `error`: An `Error` object if the fetch operation has failed, or `null` otherwise.
 * - `refetch`: A function that can be called to refetch the data.
 */

export function useFetch<TData = unknown>(
  url: string,
  options: UseFetchOptions<TData> = {},
): UseFetchResult<TData> {
  const {
    library = 'axios',
    queryKey,
    queryFn,
    axiosOptions,
    kyOptions,
    fetchOptions,
  } = options
  const [data, setData] = useState<TData | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let response

      switch (library) {
        case 'axios':
          response = await axios.get(url, axiosOptions)
          break
        case 'ky':
          response = await ky.get(url, kyOptions).json()
          break
        case 'fetch':
          response = await fetch(url, fetchOptions)
          response = await response.json()
          break
        case 'react-query':
          if (!queryKey || !queryFn) {
            throw new Error(
              'queryKey and queryFn are required when using react-query',
            )
          }
          const queryClient = new QueryClient()
          response = await queryClient.fetchQuery<TData>({
            queryKey,
            queryFn,
          })
          break
        default:
          throw new Error('Unsupported fetch library')
      }

      setData(response)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }, [url, library, axiosOptions, kyOptions, fetchOptions, queryKey, queryFn])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}
