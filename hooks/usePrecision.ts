import { useState, useEffect } from "react";

type PrecisionOptions = {
  precision: number;
  value: number;
};

/**
 * @function formatNumber
 * @param {number} value - The value to be formatted.
 * @param {number} precision - The precision of the formatted value.
 * @returns {number} The formatted value.
 */
const formatNumber = (value: number, precision: number) => {
  return Number(value.toFixed(precision));
};

/**
 * A custom React hook that sets the precision of a number.
 * @param {PrecisionOptions} { precision, value } - The precision and value to be formatted.
 * @returns {number} The formatted value.
 */
const usePrecision = ({ precision, value }: PrecisionOptions) => {
  const [formattedValue, setFormattedValue] = useState<number>(
    formatNumber(value, precision),
  );

  useEffect(() => {
    setFormattedValue(formatNumber(value, precision));
  }, [precision, value]);

  return formattedValue;
};

export default usePrecision;
