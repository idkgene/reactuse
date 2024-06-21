import { isDefined } from '../isDefined'

describe('isDefined', () => {
  it('should return true for defined values', () => {
    expect(isDefined('hello')).toBe(true)
    expect(isDefined(123)).toBe(true)
    expect(isDefined(true)).toBe(true)
    expect(isDefined([])).toBe(true)
    expect(isDefined({})).toBe(true)
    expect(isDefined(Symbol())).toBe(true)
  })

  it('should return false for undefined or null values', () => {
    expect(isDefined(undefined)).toBe(false)
    expect(isDefined(null)).toBe(false)
  })

  it('should work with union types', () => {
    const value: string | undefined = 'hello'
    expect(isDefined(value)).toBe(true)

    const value2: number | null = 123
    expect(isDefined(value2)).toBe(true)

    const value3: string | undefined = undefined
    expect(isDefined(value3)).toBe(false)

    const value4: number | null = null
    expect(isDefined(value4)).toBe(false)
  })
})
