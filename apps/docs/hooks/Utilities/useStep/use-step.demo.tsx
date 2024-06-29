'use client';
import React from 'react';
import { useStep } from './use-step';

function UseStepDemo() {
  const {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    reset,
  } = useStep({ max: 3, initial: 1 });

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Step 1: Personal Information</h2>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Contact Details</h2>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3: Confirmation</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Multi-Step Form</h1>
      <p>
        Step {currentStep} of {totalSteps}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {renderStepContent()}
        <div>
          {!isFirstStep && <button onClick={previousStep}>Previous</button>}
          {!isLastStep && <button onClick={nextStep}>Next</button>}
          {isLastStep ? <button type="submit">Submit</button> : null}
        </div>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default UseStepDemo;
