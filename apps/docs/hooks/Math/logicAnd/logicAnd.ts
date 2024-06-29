import type { Resolvable } from '../math';

function resolveValue<T>(value: Resolvable<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function logicAnd(...args: Resolvable<any>[]): boolean {
  return args.every((arg) => resolveValue(arg));
}

export { logicAnd as and };
