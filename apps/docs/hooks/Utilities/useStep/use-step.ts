import { useRef, useState } from 'react';

export type StepValue = number | 'first' | 'last';

export interface UseStepOptions {
  max?: number;
  initial?: number;
  step?: number;
}

export interface UseStepResult {
  totalSteps: number;
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
  goToStep: (value: StepValue) => void;
  canGoToNextStep: boolean;
  canGoToPreviousStep: boolean;
}

export const useStep = (options: UseStepOptions = {}): UseStepResult => {
  const { max = 1, initial = 1, step = 1 } = options;

  if (max < 1) {
    throw new Error('max must be greater than or equal to 1');
  }

  if (initial < 1 || initial > max) {
    throw new Error(`initial must be between 1 and ${String(max)}`);
  }

  if (step <= 0) {
    throw new Error('step must be greater than 0');
  }

  const initialStep = useRef(Math.min(Math.max(initial, 1), max));
  const [currentStep, setCurrentStep] = useState(initialStep.current);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === max;

  const nextStep = (): void => {
    setCurrentStep((prevStep) => Math.min(prevStep + step, max));
  };

  const previousStep = (): void => {
    setCurrentStep((prevStep) => Math.max(prevStep - step, 1));
  };

  const reset = (): void => {
    setCurrentStep(initialStep.current);
  };

  const goToStep = (value: StepValue): void => {
    if (typeof value === 'number') {
      setCurrentStep((_prevStep) => Math.min(Math.max(value, 1), max));
    } else if (value === 'first') {
      reset();
    } else {
      setCurrentStep(max);
    }
  };

  return {
    totalSteps: max,
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    reset,
    goToStep,
    canGoToNextStep: currentStep < max,
    canGoToPreviousStep: currentStep > 1,
  };
};
