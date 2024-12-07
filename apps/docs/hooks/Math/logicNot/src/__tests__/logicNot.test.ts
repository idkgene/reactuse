import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { logicNot } from '../logicNot';
import { useRef } from 'react';

describe('logicNot', () => {
  describe('Basic Values', () => {
    describe('with direct values', () => {
      it('should negate true to false', () => {
        const { result } = renderHook(() => logicNot(true));
        expect(result.current).toBe(false);
      });

      it('should negate false to true', () => {
        const { result } = renderHook(() => logicNot(false));
        expect(result.current).toBe(true);
      });

      it('should handle truthy values', () => {
        const { result: result1 } = renderHook(() => logicNot(1));
        expect(result1.current).toBe(false);

        const { result: result2 } = renderHook(() => logicNot('hello'));
        expect(result2.current).toBe(false);

        const { result: result3 } = renderHook(() => logicNot([]));
        expect(result3.current).toBe(false);
      });

      it('should handle falsy values', () => {
        const { result: result1 } = renderHook(() => logicNot(0));
        expect(result1.current).toBe(true);

        const { result: result2 } = renderHook(() => logicNot(''));
        expect(result2.current).toBe(true);

        const { result: result3 } = renderHook(() => logicNot(null));
        expect(result3.current).toBe(true);

        const { result: result4 } = renderHook(() => logicNot(undefined));
        expect(result4.current).toBe(true);
      });
    });

    describe('with refs', () => {
      it('should handle ref values', () => {
        const { result: resultTrue } = renderHook(() => {
          const trueRef = useRef(true);
          return logicNot(trueRef);
        });
        expect(resultTrue.current).toBe(false);

        const { result: resultFalse } = renderHook(() => {
          const falseRef = useRef(false);
          return logicNot(falseRef);
        });
        expect(resultFalse.current).toBe(true);
      });
    });
  });

  describe('Reactivity', () => {
    it('should update when ref value changes', () => {
      const { result, rerender } = renderHook(() => {
        const ref = useRef(false);
        const output = logicNot(ref);
        // Simulate ref change
        ref.current = true;
        return output;
      });

      rerender();
      expect(result.current).toBe(false);
    });
  });
});
