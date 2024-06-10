import { createFetch } from './useFetch';
import { useEffect, useState } from 'react';

const useCustomFetch = createFetch({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  options: {
    immediate: true,
    timeout: 5000,
  },
});

const DemoComponent = () => {
  const { data, isFetching, error, statusCode, execute, abort, canAbort } =
    useCustomFetch('/posts', {
      refetch: false,
      immediate: true,
    });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Fetch Posts</h1>
        <div className="mb-6">
          <button
            className={`mr-4 px-4 py-2 rounded bg-blue-500 text-white ${
              isFetching ? 'disabled:opacity-50' : ''
            }`}
            onClick={execute}
            disabled={isFetching}
          >
            {isFetching ? 'Loading...' : 'Fetch Data'}
          </button>
          {canAbort && (
            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              onClick={abort}
            >
              Abort
            </button>
          )}
        </div>

        {statusCode && (
          <p className="text-sm mb-4">
            <strong>Status Code:</strong> {statusCode}
          </p>
        )}
        {error && (
          <p className="text-red-500 mb-4">
            <strong>Error:</strong> {error.message}
          </p>
        )}
        {data ? (
          <ul className="list-disc pl-5 space-y-2">
            {data.map((post: { id: number; title: string }) => (
              <li key={post.id} className="text-sm">
                {post.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            {isFetching ? 'Fetching data...' : 'No data available'}
          </p>
        )}
      </div>
    </div>
  );
};

export default DemoComponent;
