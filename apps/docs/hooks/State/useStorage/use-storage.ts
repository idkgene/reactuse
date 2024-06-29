import { useSyncExternalStore } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';
import { isClient } from '@/utils/helpers';

export type UseStorageInitialValue<Value> = Value | (() => Value);
export interface UseStorageOptions<Value> {
  serializer?: (value: Value) => string;
  deserializer?: (value: string) => Value;
  storage?: Storage;
  initialValue?: UseStorageInitialValue<Value>;
}

export type UseStorageReturn<Value> = [
  value: Value,
  set: (value: Value) => void,
  remove: () => void,
];

export const dispatchStorageEvent = (params: Partial<StorageEvent>): boolean =>
  window.dispatchEvent(new StorageEvent('storage', params));

const setStorageItem = (storage: Storage, key: string, value: string): void => {
  const oldValue = storage.getItem(key);

  storage.setItem(key, value);
  dispatchStorageEvent({
    key,
    oldValue,
    newValue: value,
    storageArea: storage,
  });
};

const removeStorageItem = (storage: Storage, key: string): void => {
  const oldValue = storage.getItem(key);

  storage.removeItem(key);
  dispatchStorageEvent({ key, oldValue, newValue: null, storageArea: storage });
};

const getStorageItem = (storage: Storage, key: string): string | undefined => {
  const value = storage.getItem(key);
  if (!value) return undefined;
  return value;
};

const storageSubscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('storage', callback);
  };
};

const getServerSnapshot = (): undefined => undefined;

export const useStorage = <Value>(
  key: string,
  params?: UseStorageInitialValue<Value> | UseStorageOptions<Value>,
): readonly [Value | undefined, (value: Value) => void, () => void] => {
  const options = (
    typeof params === 'object' ? params : undefined
  ) as UseStorageOptions<Value>;
  const initialValue = (
    options ? options.initialValue : params
  ) as UseStorageInitialValue<Value>;

  const storage = options.storage ?? window.localStorage;
  const serializer = (value: Value): string => {
    if (options.serializer) return options.serializer(value);
    return JSON.stringify(value);
  };

  const deserializer = (value: string): Value => {
    if (options.deserializer) return options.deserializer(value);

    if (value === 'undefined') {
      return undefined as unknown as Value;
    }

    try {
      return JSON.parse(value) as Value;
    } catch (error) {
      return value as Value;
    }
  };

  const getSnapshot = (): string | undefined => getStorageItem(storage, key);
  const store = useSyncExternalStore(
    storageSubscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const set = (value: Value): void => {
    if (value === null) {
      removeStorageItem(storage, key);
      return;
    }
    setStorageItem(storage, key, serializer(value));
  };

  useIsomorphicLayoutEffect(() => {
    const value = getStorageItem(storage, key);
    if (value !== undefined && !initialValue) return;

    setStorageItem(
      storage,
      key,
      serializer(
        initialValue instanceof Function ? initialValue() : initialValue,
      ),
    );
  }, [key]);

  const remove = (): void => {
    removeStorageItem(storage, key);
  };

  if (!isClient)
    return [
      initialValue instanceof Function ? initialValue() : initialValue,
      set,
      remove,
    ] as const;
  return [store ? deserializer(store) : undefined, set, remove] as const;
};
