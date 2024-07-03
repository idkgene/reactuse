'use client';

import { useWizard, type WizardItem } from './use-wizard';
import { Button } from '@/components/Common/Button/button';

const wizardMap: WizardItem[] = [
  { id: 'step1', nodes: ['step2'] },
  { id: 'step2', nodes: ['step3', 'step4'] },
  { id: 'step3', nodes: ['step5'] },
  { id: 'step4', nodes: ['step5'] },
  { id: 'step5', nodes: [] },
];

function WizardDemo(): JSX.Element {
  const wizard = useWizard(wizardMap, { allowCyclicNavigation: true });

  const renderStepContent = (): JSX.Element => {
    switch (wizard.currentStepId) {
      case 'step1':
        return <h2>Welcome to Step 1</h2>;
      case 'step2':
        return <h2>You&apos;re now at Step 2</h2>;
      case 'step3':
        return <h2>This is Step 3</h2>;
      case 'step4':
        return <h2>You&apos;ve reached Step 4</h2>;
      case 'step5':
        return <h2>Congratulations! You&apos;re at the final Step 5</h2>;
      default:
        return <h2>Unknown step</h2>;
    }
  };

  return (
    <div>
      {renderStepContent()}
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={wizard.back}
          disabled={!wizard.canGoBack}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={wizard.forward}
          disabled={!wizard.canGoForward}
        >
          Forward
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button
          type="button"
          onClick={() => {
            wizard.set('step1');
          }}
        >
          Go to Step 1
        </Button>
        <Button
          type="button"
          onClick={() => {
            wizard.set('step2');
          }}
        >
          Go to Step 2
        </Button>
        <Button
          type="button"
          onClick={() => {
            wizard.set('step3');
          }}
        >
          Go to Step 3
        </Button>
        <Button
          type="button"
          onClick={() => {
            wizard.set('step4');
          }}
        >
          Go to Step 4
        </Button>
        <Button
          type="button"
          onClick={() => {
            wizard.set('step5');
          }}
        >
          Go to Step 5
        </Button>
        <Button type="button" onClick={wizard.reset}>
          Reset
        </Button>
      </div>
      <div>
        <p className="text-sm font-semibold">
          Current Step: <span>{wizard.currentStepId}</span>
        </p>
        <p className="text-sm font-semibold">
          History: {wizard.history.join(' -> ')}
        </p>
      </div>
    </div>
  );
}

export default WizardDemo;
