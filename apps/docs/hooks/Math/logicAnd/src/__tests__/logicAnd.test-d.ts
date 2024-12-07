import { describe, expectTypeOf, it } from 'vitest'
import { RefObject, useRef } from 'react'
import { logicAnd, type Reference, type Referential } from '../logicAnd'

describe('logicAnd types', () => {
  it('should accept refs and direct values', () => {
    const ref = useRef(true)
    const result = logicAnd(ref, true, false)
    expectTypeOf(result).toBeBoolean()
  })

  it('should properly type Reference', () => {
    type StringRef = Reference<string>
    expectTypeOf<StringRef>().toEqualTypeOf<RefObject<string>>()
  })

  it('should properly type Referential', () => {
    type NumberRef = Referential<number>
    expectTypeOf<NumberRef>().toEqualTypeOf<number | RefObject<number>>()
  })

  it('should handle mixed ref types', () => {
    const numberRef = useRef(42)
    const stringRef = useRef('hello')
    const boolRef = useRef(true)

    const result = logicAnd(numberRef, stringRef, boolRef)
    expectTypeOf(result).toBeBoolean()
  })

  it('should handle mixed refs and values', () => {
    const numberRef = useRef(42)
    const result = logicAnd(numberRef, 'hello', true, {}, [])
    expectTypeOf(result).toBeBoolean()
  })

  it('should handle empty args', () => {
    const result = logicAnd()
    expectTypeOf(result).toBeBoolean()
  })

  it('should handle single argument', () => {
    const ref = useRef(true)
    expectTypeOf(logicAnd(ref)).toBeBoolean()
    expectTypeOf(logicAnd(true)).toBeBoolean()
  })
})
