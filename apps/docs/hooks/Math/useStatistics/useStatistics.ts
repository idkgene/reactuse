import { useCallback } from 'react';

const useStatistics = () => {
  const mean = useCallback((numbers: number[]) => {
    if (numbers.length === 0) return null;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  }, []);

  const median = useCallback((numbers: number[]) => {
    if (numbers.length === 0) return null;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }, []);

  const mode = useCallback((numbers: number[]) => {
    if (numbers.length === 0) return null;
    const frequency: Record<number, number> = {};
    let maxFreq = 0;
    let modes: number[] = [];

    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
        modes = [num];
      } else if (frequency[num] === maxFreq) {
        modes.push(num);
      }
    });

    return modes.length === numbers.length ? null : modes;
  }, []);

  const standardDeviation = useCallback(
    (numbers: number[]) => {
      if (numbers.length === 0) return null;
      const avg = mean(numbers);
      if (avg === null) return null;
      const squareDiffs = numbers.map((num) => Math.pow(num - avg, 2));
      const avgSquareDiff = mean(squareDiffs);
      if (avgSquareDiff === null) return null;
      return Math.sqrt(avgSquareDiff);
    },
    [mean],
  );

  return { mean, median, mode, standardDeviation };
};

export { useStatistics };
export const statistics = useStatistics;
