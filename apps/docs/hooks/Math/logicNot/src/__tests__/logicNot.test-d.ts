import { describe, expectTypeOf, it } from 'vitest'
import { RefObject, useRef } from 'react'
import { logicNot, type Reference, type Referential } from '../logicNot'

describe('logicNot types', () => {
  it('should accept ref and return boolean', () => {
    const ref = useRef(true)
    const result = logicNot(ref)
    expectTypeOf(result).toBeBoolean()
  })

  it('should accept direct value and return boolean', () => {
    const result = logicNot(true)
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

  it('should handle any ref type', () => {
    const numberRef = useRef(42)
    const stringRef = useRef('hello')
    const boolRef = useRef(true)

    expectTypeOf(logicNot(numberRef)).toBeBoolean()
    expectTypeOf(logicNot(stringRef)).toBeBoolean()
    expectTypeOf(logicNot(boolRef)).toBeBoolean()
  })

  it('should handle any value type', () => {
    expectTypeOf(logicNot(42)).toBeBoolean()
    expectTypeOf(logicNot('hello')).toBeBoolean()
    expectTypeOf(logicNot(true)).toBeBoolean()
    expectTypeOf(logicNot({})).toBeBoolean()
    expectTypeOf(logicNot([])).toBeBoolean()
  })
})
