import { useState } from "react";

const useTrunc = () => {
  const [result, setResult] = useState<number | null>(null);

  const truncateNumber = (number: number) => {
    setResult(Math.trunc(number));
  }

  return [result, truncateNumber];
}

export default useTrunc;