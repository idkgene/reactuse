import { useEffect, useState, useRef } from 'react';

import type {
  UseAsyncQueueOptions,
  UseAsyncQueueReturn,
  UseAsyncQueueTask,
} from '../utilities';

/**
 * Executes a series of async tasks in sequence, providing individual task results and the index of the active task.
 *
 * This hook manages an async task queue, executing tasks one after another. The execution can be interrupted if a task fails,
 * and it also supports callbacks for error handling and completion. The execution can be aborted using an AbortSignal.
 *
 * @template T - An array of task result types.
 * @param {UseAsyncQueueTask<any>[]} tasks - An array of async task functions to be executed in sequence.
 * @param {UseAsyncQueueOptions} [options={}] - Options to customize the behavior of the async queue.
 * @param {boolean} [options.interrupt=true] - Whether to stop executing subsequent tasks if a task fails.
 * @param {() => void} [options.onError] - A callback function that's called when a task fails.
 * @param {() => void} [options.onFinished] - A callback function that's called when all tasks have finished executing.
 * @param {AbortSignal} [options.signal] - An AbortSignal to cancel the queue execution.
 * @returns {UseAsyncQueueReturn<T>} An object containing the active index and task results.
 *
 * @example
 * Defining async tasks
 * const tasks = [
 *   async () => await fetchDataFromAPI1(),
 *   async () => await fetchDataFromAPI2(),
 *   async () => await fetchDataFromAPI3()
 * ];
 *
 * Using the async queue with error handling
 * const { activeIndex, result } = useAsyncQueue(tasks, {
 *   interrupt: true,
 *   onError: () => console.error('A task failed'),
 *   onFinished: () => console.log('All tasks finished')
 * });
 */
export function useAsyncQueue<T extends unknown[]>(
  tasks: UseAsyncQueueTask<any>[],
  options: UseAsyncQueueOptions = {}
): UseAsyncQueueReturn<T> {
  const { interrupt = true, onError, onFinished, signal } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const [result, setResult] = useState<UseAsyncQueueReturn<T>['result']>(
    () =>
      tasks.map(() => ({
        state: 'pending',
        data: null,
      })) as UseAsyncQueueReturn<T>['result']
  );

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const runTasks = async () => {
      abortControllerRef.current = new AbortController();

      for (let i = 0; i < tasks.length; i++) {
        setActiveIndex(i);

        if (signal?.aborted || abortControllerRef.current.signal.aborted) {
          setResult(prevResult => ({
            ...prevResult,
            [i]: { state: 'aborted', data: null },
          }));
          break;
        }

        try {
          const data = await tasks[i]();
          setResult(prevResult => ({
            ...prevResult,
            [i]: { state: 'fulfilled', data },
          }));
        } catch (error) {
          setResult(prevResult => ({
            ...prevResult,
            [i]: { state: 'rejected', data: null },
          }));

          if (interrupt) {
            break;
          }

          onError?.();
        }
      }

      onFinished?.();
    };

    runTasks();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [tasks, interrupt, onError, onFinished, signal]);

  return { activeIndex, result };
}
