import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { logicAnd } from '../logicAnd'
import { useRef } from 'react'

describe('logicAnd', () => {
  describe('Basic Values', () => {
    describe('with direct values', () => {
      it('should return true for all truthy values', () => {
        const { result } = renderHook(() => logicAnd(true, 1, 'hello', [], {}))
        expect(result.current).toBe(true)
      })

      it('should return false if any value is falsy', () => {
        const { result: result1 } = renderHook(() => logicAnd(true, false))
        expect(result1.current).toBe(false)

        const { result: result2 } = renderHook(() => logicAnd(true, 0))
        expect(result2.current).toBe(false)

        const { result: result3 } = renderHook(() => logicAnd(true, ''))
        expect(result3.current).toBe(false)

        const { result: result4 } = renderHook(() => logicAnd(true, null))
        expect(result4.current).toBe(false)

        const { result: result5 } = renderHook(() => logicAnd(true, undefined))
        expect(result5.current).toBe(false)
      })

      it('should handle empty args', () => {
        const { result } = renderHook(() => logicAnd())
        expect(result.current).toBe(true)
      })

      it('should handle single argument', () => {
        const { result: resultTrue } = renderHook(() => logicAnd(true))
        expect(resultTrue.current).toBe(true)

        const { result: resultFalse } = renderHook(() => logicAnd(false))
        expect(resultFalse.current).toBe(false)
      })
    })

    describe('with refs', () => {
      it('should handle ref values', () => {
        const { result: resultTrue } = renderHook(() => {
          const trueRef1 = useRef(true)
          const trueRef2 = useRef(true)
          return logicAnd(trueRef1, trueRef2)
        })
        expect(resultTrue.current).toBe(true)

        const { result: resultFalse } = renderHook(() => {
          const trueRef = useRef(true)
          const falseRef = useRef(false)
          return logicAnd(trueRef, falseRef)
        })
        expect(resultFalse.current).toBe(false)
      })

      it('should handle mixed refs and values', () => {
        const { result: resultTrue } = renderHook(() => {
          const trueRef = useRef(true)
          return logicAnd(trueRef, true, 1)
        })
        expect(resultTrue.current).toBe(true)

        const { result: resultFalse } = renderHook(() => {
          const trueRef = useRef(true)
          return logicAnd(trueRef, false)
        })
        expect(resultFalse.current).toBe(false)
      })
    })
  })

  describe('Reactivity', () => {
    it('should update when ref value changes', () => {
      const { result, rerender } = renderHook(() => {
        const ref1 = useRef(true)
        const ref2 = useRef(true)
        const output = logicAnd(ref1, ref2)
        // Simulate ref change
        ref2.current = false
        return output
      })

      rerender()
      expect(result.current).toBe(false)
    })
  })
})
