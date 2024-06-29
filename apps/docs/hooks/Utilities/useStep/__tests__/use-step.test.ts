import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useStep, type UseStepOptions, type UseStepResult } from '../use-step';

describe('useStep', () => {
  const renderUseStep = (
    options?: UseStepOptions,
  ): { result: { current: UseStepResult } } =>
    renderHook(() => useStep(options));

  it('should initialize with default values', () => {
    const { result } = renderUseStep();
    expect(result.current).toEqual({
      totalSteps: 1,
      currentStep: 1,
      isFirstStep: true,
      isLastStep: true,
      canGoToNextStep: false,
      canGoToPreviousStep: false,
      nextStep: expect.any(Function),
      previousStep: expect.any(Function),
      reset: expect.any(Function),
      goToStep: expect.any(Function),
    });
  });

  it('should initialize with custom options', () => {
    const { result } = renderUseStep({ max: 5, initial: 2, step: 2 });
    expect(result.current.totalSteps).toBe(5);
    expect(result.current.currentStep).toBe(2);
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(false);
  });

  it('should handle nextStep correctly', () => {
    const { result } = renderUseStep({ max: 3 });
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(2);
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(3);
    expect(result.current.isLastStep).toBe(true);
  });

  it('should handle previousStep correctly', () => {
    const { result } = renderUseStep({ max: 3, initial: 3 });
    act(() => {
      result.current.previousStep();
    });
    expect(result.current.currentStep).toBe(2);
    act(() => {
      result.current.previousStep();
    });
    expect(result.current.currentStep).toBe(1);
    expect(result.current.isFirstStep).toBe(true);
  });

  it('should reset to initial step', () => {
    const { result } = renderUseStep({ max: 5, initial: 3 });
    act(() => {
      result.current.nextStep();
      result.current.reset();
    });
    expect(result.current.currentStep).toBe(3);
  });

  it('should go to specific step', () => {
    const { result } = renderUseStep({ max: 5 });
    act(() => {
      result.current.goToStep(3);
    });
    expect(result.current.currentStep).toBe(3);
    act(() => {
      result.current.goToStep('first');
    });
    expect(result.current.currentStep).toBe(1);
    act(() => {
      result.current.goToStep('last');
    });
    expect(result.current.currentStep).toBe(5);
  });

  it('should handle custom step size', () => {
    const { result } = renderUseStep({ max: 10, step: 2 });
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(3);
    act(() => {
      result.current.previousStep();
    });
    expect(result.current.currentStep).toBe(1);
  });

  it('should throw error for invalid max', () => {
    expect(() => renderUseStep({ max: 0 })).toThrow(
      'max must be greater than or equal to 1',
    );
  });

  it('should throw error for invalid initial', () => {
    expect(() => renderUseStep({ max: 5, initial: 0 })).toThrow(
      'initial must be between 1 and 5',
    );
    expect(() => renderUseStep({ max: 5, initial: 6 })).toThrow(
      'initial must be between 1 and 5',
    );
  });

  it('should throw error for invalid step', () => {
    expect(() => renderUseStep({ step: 0 })).toThrow(
      'step must be greater than 0',
    );
    expect(() => renderUseStep({ step: -1 })).toThrow(
      'step must be greater than 0',
    );
  });

  it('should handle edge cases for goToStep', () => {
    const { result } = renderUseStep({ max: 5 });
    act(() => {
      result.current.goToStep(0);
    });
    expect(result.current.currentStep).toBe(1);
    act(() => {
      result.current.goToStep(10);
    });
    expect(result.current.currentStep).toBe(5);
  });

  it('should update canGoToNextStep and canGoToPreviousStep correctly', () => {
    const { result } = renderUseStep({ max: 3 });
    expect(result.current.canGoToNextStep).toBe(true);
    expect(result.current.canGoToPreviousStep).toBe(false);

    act(() => {
      result.current.nextStep();
    });
    expect(result.current.canGoToNextStep).toBe(true);
    expect(result.current.canGoToPreviousStep).toBe(true);

    act(() => {
      result.current.nextStep();
    });
    expect(result.current.canGoToNextStep).toBe(false);
    expect(result.current.canGoToPreviousStep).toBe(true);
  });

  it('should handle large step sizes correctly', () => {
    const { result } = renderUseStep({ max: 10, step: 5 });
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(6);
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(10);
    act(() => {
      result.current.previousStep();
    });
    expect(result.current.currentStep).toBe(5);
  });

  it('should maintain step within bounds for extreme initial values', () => {
    const { result } = renderUseStep({ max: 5, initial: -10 });
    expect(result.current.currentStep).toBe(1);

    const { result: result2 } = renderUseStep({ max: 5, initial: 100 });
    expect(result2.current.currentStep).toBe(5);
  });
});
