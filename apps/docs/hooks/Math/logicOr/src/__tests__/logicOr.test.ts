import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { logicOr } from '../logicOr';
import { useRef } from 'react';

describe('logicOr', () => {
  describe('Basic Values', () => {
    describe('with direct values', () => {
      it('should return true if any value is true', () => {
        const { result } = renderHook(() => logicOr(true, false, false));
        expect(result.current).toBe(true);
      });

      it('should return false if all values are false', () => {
        const { result } = renderHook(() => logicOr(false, false, false));
        expect(result.current).toBe(false);
      });

      it('should handle single value', () => {
        const { result: resultTrue } = renderHook(() => logicOr(true));
        expect(resultTrue.current).toBe(true);

        const { result: resultFalse } = renderHook(() => logicOr(false));
        expect(resultFalse.current).toBe(false);
      });

      it('should handle no arguments', () => {
        const { result } = renderHook(() => logicOr());
        expect(result.current).toBe(false);
      });
    });

    describe('with refs', () => {
      it('should handle ref values', () => {
        const { result } = renderHook(() => {
          const trueRef = useRef(true);
          const falseRef = useRef(false);
          return logicOr(trueRef, falseRef);
        });
        expect(result.current).toBe(true);
      });

      it('should handle mixed refs and values', () => {
        const { result } = renderHook(() => {
          const falseRef = useRef(false);
          return logicOr(true, falseRef, false);
        });
        expect(result.current).toBe(true);
      });
    });
  });

  describe('Reactivity', () => {
    it('should update when ref values change', () => {
      const { result, rerender } = renderHook(() => {
        const ref = useRef(false);
        const output = logicOr(ref, false);
        // Simulate ref change
        ref.current = true;
        return output;
      });

      rerender();
      expect(result.current).toBe(true);
    });

    it('should handle multiple ref updates', () => {
      const { result, rerender } = renderHook(() => {
        const ref1 = useRef(false);
        const ref2 = useRef(false);
        const output = logicOr(ref1, ref2);
        // Simulate ref changes
        ref1.current = true;
        ref2.current = true;
        return output;
      });

      rerender();
      expect(result.current).toBe(true);
    });
  });
});
