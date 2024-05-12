import { useState, useEffect } from 'react'

type PrecisionOptions = {
  precision: number
  value: number
}

type FormattedValue = number

const formatNumber = (value: number, precision: number): FormattedValue => {
  return Number(value.toFixed(precision))
}

type UsePrecisionReturn = FormattedValue

export const usePrecision = ({
  precision,
  value,
}: PrecisionOptions): UsePrecisionReturn => {
  const [formattedValue, setFormattedValue] = useState<FormattedValue>(() =>
    formatNumber(value, precision)
  )

  useEffect(() => {
    setFormattedValue(formatNumber(value, precision))
  }, [precision, value])

  return formattedValue
}
