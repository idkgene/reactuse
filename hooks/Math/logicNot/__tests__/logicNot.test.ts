import { logicNot } from '../logicNot'

describe('logicNot', () => {
  test('should return false when input is true', () => {
    expect(logicNot(true)).toBe(false)
  })

  test('should return true when input is false', () => {
    expect(logicNot(false)).toBe(true)
  })

  test('should return false when getter returns true', () => {
    const getter = () => true
    expect(logicNot(getter)).toBe(false)
  })

  test('should return true when getter returns false', () => {
    const getter = () => false
    expect(logicNot(getter)).toBe(true)
  })

  test('should throw an error for non-boolean and non-function input', () => {
    const invalidInput = 123
    expect(() => logicNot(invalidInput as any)).toThrow(
      'logicNot: Expected a boolean or a function that returns a boolean.'
    )
  })

  test('should throw an error when function does not return a boolean', () => {
    const invalidGetter = () => 'hello'
    expect(() => logicNot(invalidGetter as any)).toThrow(
      'logicNot: Expected a boolean or a function that returns a boolean.'
    )
  })

  test('should preserve the boolean type', () => {
    const result1: boolean = logicNot(true)
    const result2: boolean = logicNot(() => false)
    expect(result1).toBe(false)
    expect(result2).toBe(true)
  })
})
