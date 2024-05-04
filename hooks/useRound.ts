import { useState } from "react";

const useRound = () => {
  const [result, setResult] = useState<number | null>(null);

  const roundNumber = (number: number) => {
    setResult(Math.round(number));
  }

  return [result, roundNumber];
}

export default useRound