import { useState, useCallback, useMemo } from 'react';

export type WizardStepId = string;

export interface WizardItem {
  id: WizardStepId;
  nodes: WizardStepId[];
}

export interface UseWizardOptions {
  initialStepId?: WizardStepId;
  allowCyclicNavigation?: boolean;
}

export interface UseWizardReturn {
  currentStepId: WizardStepId;
  set: (id: WizardStepId) => void;
  reset: () => void;
  back: () => void;
  forward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  history: WizardStepId[];
  isFirstStep: boolean;
  isLastStep: boolean;
}

const createWizardMap = (map: WizardItem[]): Map<WizardStepId, WizardItem> => {
  const wizardMap = new Map<WizardStepId, WizardItem>();
  for (const item of map) {
    if (wizardMap.has(item.id)) {
      throw new Error(`Duplicate wizard step ID: ${item.id}`);
    }
    wizardMap.set(item.id, item);
  }
  return wizardMap;
};

export const useWizard = (
  map: WizardItem[],
  options: UseWizardOptions = {},
): UseWizardReturn => {
  if (map.length === 0) {
    throw new Error('Wizard map cannot be empty');
  }

  const { initialStepId = map[0].id, allowCyclicNavigation = false } = options;
  const wizardMap = useMemo(() => createWizardMap(map), [map]);

  if (!wizardMap.has(initialStepId)) {
    throw new Error(`Invalid initial step ID: ${initialStepId}`);
  }

  const [currentStepId, setCurrentStepId] =
    useState<WizardStepId>(initialStepId);
  const [history, setHistory] = useState<WizardStepId[]>([initialStepId]);

  const isValidTransition = useCallback(
    (fromId: WizardStepId, toId: WizardStepId): boolean => {
      const fromStep = wizardMap.get(fromId);
      if (!fromStep) return false;
      return (
        fromStep.nodes.includes(toId) ||
        (allowCyclicNavigation && wizardMap.has(toId))
      );
    },
    [wizardMap, allowCyclicNavigation],
  );

  const set = useCallback(
    (id: WizardStepId) => {
      if (!wizardMap.has(id)) {
        throw new Error(`Invalid step ID: ${id}`);
      }
      if (!isValidTransition(currentStepId, id)) {
        throw new Error(`Invalid transition from ${currentStepId} to ${id}`);
      }
      setHistory((prev) => [...prev, id]);
      setCurrentStepId(id);
    },
    [currentStepId, isValidTransition, wizardMap],
  );

  const reset = useCallback(() => {
    setCurrentStepId(initialStepId);
    setHistory([initialStepId]);
  }, [initialStepId]);

  const back = useCallback(() => {
    if (history.length > 1) {
      const previousStepId = history[history.length - 2];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentStepId(previousStepId);
    }
  }, [history]);

  const forward = useCallback(() => {
    const currentStep = wizardMap.get(currentStepId);
    if (currentStep && currentStep.nodes.length > 0) {
      set(currentStep.nodes[0]);
    }
  }, [currentStepId, set, wizardMap]);

  const canGoBack = history.length > 1;
  const canGoForward = (wizardMap.get(currentStepId)?.nodes ?? []).length > 0;
  const isFirstStep = currentStepId === initialStepId;
  const isLastStep = wizardMap.get(currentStepId)?.nodes.length === 0;

  return {
    currentStepId,
    set,
    reset,
    back,
    forward,
    canGoBack,
    canGoForward,
    history,
    isFirstStep,
    isLastStep,
  };
};
