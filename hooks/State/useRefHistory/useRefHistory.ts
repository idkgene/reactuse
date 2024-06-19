import { useRef, useEffect, useState, useCallback } from 'react';

export interface HistoryItem<T> {
  snapshot: T;
  timestamp: number;
}

export interface UseRefHistoryOptions<T> {
  deep?: boolean;
  flush?: 'pre' | 'post' | 'sync';
  capacity?: number;
  clone?: (value: T) => T;
  dump?: (value: T) => string;
  parse?: (value: string) => T;
}

export function useRefHistory<T>(initialValue: T, options?: UseRefHistoryOptions<T>) {
  const {
    deep = false,
    flush = 'pre',
    capacity = Infinity,
    clone = defaultClone,
    dump = JSON.stringify,
    parse = JSON.parse,
  } = options || {};

  const ref = useRef<T>(initialValue);
  const [history, setHistory] = useState<HistoryItem<T>[]>([]);

  const commit = useCallback(() => {
    const snapshot = deep ? clone(ref.current) : ref.current;
    setHistory(prevHistory => [
      { snapshot, timestamp: Date.now() },
      ...prevHistory.slice(0, capacity - 1),
    ]);
  }, [deep, clone, capacity]);

  const undo = useCallback(() => {
    if (history.length > 1) {
      ref.current = parse(dump(history[1].snapshot));
      setHistory(prevHistory => prevHistory.slice(1));
    }
  }, [history, dump, parse]);

  const redo = useCallback(() => {
    if (history.length > 0) {
      ref.current = parse(dump(history[0].snapshot));
      setHistory(prevHistory => [history[0], ...prevHistory]);
    }
  }, [history, dump, parse]);

  const clear = useCallback(() => {
    setHistory([]);
  }, []);

  const batch = useCallback(
    (callback: () => void) => {
      if (flush === 'sync') {
        callback();
        commit();
      } else {
        callback();
      }
    },
    [flush, commit]
  );

  useEffect(() => {
    if (flush === 'pre') {
      const timer = setTimeout(() => {
        commit();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [flush, commit]);

  return { value: ref.current, history, undo, redo, clear, commit, batch };
}

export function defaultClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}