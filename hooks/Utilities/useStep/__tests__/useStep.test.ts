import { renderHook, act } from '@testing-library/react';
import { useStep, StepValue } from '../useStep';

describe('useStep Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useStep());
    expect(result.current.totalSteps).toBe(1);
    expect(result.current.currentStep).toBe(1);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(true);
  });

  it('should initialize with provided options', () => {
    const { result } = renderHook(() => useStep({ max: 5, initial: 3 }));
    expect(result.current.totalSteps).toBe(5);
    expect(result.current.currentStep).toBe(3);
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(false);
  });

  it('should handle initial values out of bounds', () => {
    const { result: resultLow } = renderHook(() =>
      useStep({ max: 5, initial: 0 })
    );
    expect(resultLow.current.currentStep).toBe(1);

    const { result: resultHigh } = renderHook(() =>
      useStep({ max: 5, initial: 6 })
    );
    expect(resultHigh.current.currentStep).toBe(5);
  });

  it('should go to the next step', () => {
    const { result } = renderHook(() => useStep({ max: 3 }));
    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(2);
    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(3);
    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(3);
  });

  it('should go to the previous step', () => {
    const { result } = renderHook(() => useStep({ max: 3, initial: 3 }));
    act(() => result.current.previousStep());
    expect(result.current.currentStep).toBe(2);
    act(() => result.current.previousStep());
    expect(result.current.currentStep).toBe(1);
    act(() => result.current.previousStep());
    expect(result.current.currentStep).toBe(1);
  });

  it('should reset to the initial step', () => {
    const { result } = renderHook(() => useStep({ max: 5, initial: 3 }));
    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(4);
    act(() => result.current.reset());
    expect(result.current.currentStep).toBe(3);
  });

  it('should go to a specific step', () => {
    const { result } = renderHook(() => useStep({ max: 5 }));

    const testGoToStep = (value: StepValue, expected: number) => {
      act(() => result.current.goToStep(value));
      expect(result.current.currentStep).toBe(expected);
    };

    testGoToStep(2, 2);
    testGoToStep('first', 1);
    testGoToStep('last', 5);
    testGoToStep(0, 1);
    testGoToStep(6, 5);
  });

  it('should update isFirstStep and isLastStep correctly', () => {
    const { result } = renderHook(() => useStep({ max: 3 }));

    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);

    act(() => result.current.nextStep());
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(false);

    act(() => result.current.nextStep());
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });
});
