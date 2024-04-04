import { QueryClient } from '@tanstack/react-query'

export function throttle(cb: () => void, ms: number) {
  let lastTime = 0
  return () => {
    const now = Date.now()
    if (now - lastTime >= ms) {
      cb()
      lastTime = now
    }
  }
}

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>),
    )
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>),
    )
  }
}

export const queryClient = new QueryClient()
