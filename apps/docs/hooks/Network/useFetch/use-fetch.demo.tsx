import { useEffect, useState } from 'react';
import { createFetch } from './use-fetch';

const useCustomFetch = createFetch({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  options: {
    immediate: true,
    timeout: 5000,
  },
});

function DemoComponent() {
  const { data, isFetching, error, statusCode, execute, abort, canAbort } =
    useCustomFetch('/posts', {
      refetch: false,
      immediate: true,
    });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-xl rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Fetch Posts</h1>
        <div className="mb-6">
          <button
            className={`mr-4 rounded bg-blue-500 px-4 py-2 text-white ${
              isFetching ? 'disabled:opacity-50' : ''
            }`}
            onClick={execute}
            disabled={isFetching}
          >
            {isFetching ? 'Loading...' : 'Fetch Data'}
          </button>
          {canAbort ? <button
              className="rounded bg-red-500 px-4 py-2 text-white"
              onClick={abort}
            >
              Abort
            </button> : null}
        </div>

        {statusCode ? <p className="mb-4 text-sm">
            <strong>Status Code:</strong> {statusCode}
          </p> : null}
        {error ? <p className="mb-4 text-red-500">
            <strong>Error:</strong> {error.message}
          </p> : null}
        {data ? (
          <ul className="list-disc space-y-2 pl-5">
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
}

export default DemoComponent;
