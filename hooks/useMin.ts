import { useCallback, useEffect, useState } from "react";

const useMin = (numbers: number[]) => {
  const [min, setMin] = useState<number>(Math.min(...numbers));

  const updateMin = useCallback((newNumbers: number[]) => {
    setMin(Math.min(...newNumbers));
  }, []);

  useEffect(() => {
    updateMin(numbers);
  }, [numbers, updateMin]);

  return [min, updateMin];
};

export { useMin };
