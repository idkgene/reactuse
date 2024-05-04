import { useState, useEffect } from "react";

type PrecisionOptions = {
  precision: number;
  value: number;
};

const formatNumber = (value: number, precision: number) => {
  return Number(value.toFixed(precision));
};

const usePrecision = ({ precision, value }: PrecisionOptions) => {
  const [formattedValue, setFormattedValue] = useState(
    formatNumber(value, precision),
  );

  useEffect(() => {
    setFormattedValue(formatNumber(value, precision));
  }, [precision, value]);

  return formattedValue;
};

export default usePrecision;
