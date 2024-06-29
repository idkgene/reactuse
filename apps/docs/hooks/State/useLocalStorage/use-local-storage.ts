import type {
  UseStorageInitialValue,
  UseStorageOptions,
} from '../useStorage/use-storage';
import { useStorage } from '../useStorage/use-storage';

export const useLocalStorage = <Value>(
  key: string,
  initialValue?: UseStorageInitialValue<Value>,
  options?: UseStorageOptions<Value>,
) =>
  useStorage(key, { initialValue, storage: window.localStorage, ...options });
