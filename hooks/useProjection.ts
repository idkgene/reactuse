import { useState, useEffect } from 'react';

const useProjection = (value, domainFrom, domainTo) => {
  const [projectedValue, setProjectedValue] = useState(null);

  useEffect(() => {
    const scale = (value - domainFrom[0]) / (domainFrom[1] - domainFrom[0]);
    const projected = scale * (domainTo[1] - domainTo[0]) + domainTo[0];
    setProjectedValue(projected);
  }, [value, domainFrom, domainTo]);

  return projectedValue;
};

export default useProjection;