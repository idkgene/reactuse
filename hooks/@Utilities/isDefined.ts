export function isDefined<T>(v: T): v is Exclude<T, null | undefined> {
  return v !== null && v !== undefined
}
