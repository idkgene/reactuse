import { useRef, useState } from 'react';

/**
 *  A value representing a specific step or a keyword indicating the first or last step.
 *
 * @type {number | 'first' | 'last'} StepValue
 */
export type StepValue = number | 'first' | 'last';

/**
 * Options for configuring the `useStep` hook.
 *
 * @interface UseStepOptions
 * @property {number} [max=1] - The maximum number of steps.
 * @property {number} [initial=1] - The initial step to start at.
 */
export interface UseStepOptions {
  max?: number;
  initial?: number;
}

/**
 * The result object returned by the `useStep` hook.
 *
 * @interface UseStepResult
 * @property {number} totalSteps - The total number of steps.
 * @property {number} currentStep - The current step index.
 * @property {boolean} isFirstStep - Whether the current step is the first.
 * @property {boolean} isLastStep - Whether the current step is the last.
 * @property {() => void} nextStep - Function to go to the next step.
 * @property {() => void} previousStep - Function to go to the previous step.
 * @property {() => void} reset - Function to reset the current step to the initial step.
 * @property {(value: StepValue) => void} goToStep - Function to go to a specific step.
 */
export interface UseStepResult {
  totalSteps: number;
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
  goToStep: (value: StepValue) => void;
}

/**
 * Manages the navigation between different steps with options to go to the next, previous, first, or last step.
 *
 * This hook provides a way to handle navigation between steps. It includes utility functions to navigate
 * between steps and options to customize the initial and maximum steps.
 *
 * @param {UseStepOptions} [options={}] - Configuration options for the step navigation.
 * @param {number} [options.max=1] - The maximum number of steps.
 * @param {number} [options.initial=1] - The initial step to start at.
 * @returns {UseStepResult} An object containing step navigation functions and properties.
 *
 * @example
 * Basic step navigation
 * const {
 *   totalSteps,
 *   currentStep,
 *   isFirstStep,
 *   isLastStep,
 *   nextStep,
 *   previousStep,
 *   reset,
 *   goToStep
 * } = useStep({ max: 5, initial: 1 });
 *
 * console.log(currentStep); // Output: 1
 * nextStep();
 * console.log(currentStep); // Output: 2
 * goToStep('last');
 * console.log(currentStep); // Output: 5
 * reset();
 * console.log(currentStep); // Output: 1
 */
export const useStep = (options: UseStepOptions = {}): UseStepResult => {
  const { max = 1, initial = 1 } = options;

  const initialStep = useRef(Math.min(Math.max(initial, 1), max));
  const [currentStep, setCurrentStep] = useState(initialStep.current);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === max;

  const nextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, max));
  };

  const previousStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const reset = () => {
    setCurrentStep(initialStep.current);
  };

  const goToStep = (value: StepValue) => {
    switch (value) {
      case 'first':
        reset();
        break;
      case 'last':
        setCurrentStep(max);
        break;
      default:
        setCurrentStep(prevStep => Math.min(Math.max(value, 1), max));
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
  };
};
