import { useState, useEffect, useMemo } from 'react';

type TimeUnit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';


interface TimeAgoUnit {
  max: number;
  value: number;
  name: TimeUnit;
}

interface TimeAgoMessages {
  justNow: string;
  past: string | ((value: number | string) => string);
  future: string | ((value: number | string) => string);
  invalid: string;
  [key: string]: string | ((value: number) => string);
}

interface TimeAgoOptions {
  max?: TimeUnit | number;
  fullDateFormatter?: (date: Date) => string;
  messages?: Partial<TimeAgoMessages>;
  showSecond?: boolean;
  rounding?: 'round' | 'ceil' | 'floor' | number;
  updateInterval?: number;
}


const DEFAULT_MESSAGES: TimeAgoMessages = {
  justNow: 'just now',
  past: (n) => `${n} ago`,
  future: (n) => `in ${n}`,
  invalid: 'invalid date',
  second: (n) => `${n} second${n > 1 ? 's' : ''}`,
  minute: (n) => `${n} minute${n > 1 ? 's' : ''}`,
  hour: (n) => `${n} hour${n > 1 ? 's' : ''}`,
  day: (n) => `${n} day${n > 1 ? 's' : ''}`,
  week: (n) => `${n} week${n > 1 ? 's' : ''}`,
  month: (n) => `${n} month${n > 1 ? 's' : ''}`,
  year: (n) => `${n} year${n > 1 ? 's' : ''}`,
};

const DEFAULT_UNITS: TimeAgoUnit[] = [
  { max: 60000, value: 1000, name: 'second' },
  { max: 2760000, value: 60000, name: 'minute' },
  { max: 72000000, value: 3600000, name: 'hour' },
  { max: 518400000, value: 86400000, name: 'day' },
  { max: 2419200000, value: 604800000, name: 'week' },
  { max: 28512000000, value: 2592000000, name: 'month' },
  { max: Infinity, value: 31536000000, name: 'year' },
];

function useTimeAgo(
  date: Date | number | string,
  options: TimeAgoOptions = {},
): string {
  const [now, setNow] = useState(() => new Date());

  const {
    max,
    fullDateFormatter,
    messages: customMessages,
    showSecond = false,
    rounding = 'round',
    updateInterval = 30000,
  } = options;

  const messages = useMemo(
    () => ({ ...DEFAULT_MESSAGES, ...customMessages }),
    [customMessages],
  );

  useEffect(() => {
    if (updateInterval === 0) return;

    const timer = setInterval(() => { setNow(new Date()); }, updateInterval);
    return () => { clearInterval(timer); };
  }, [updateInterval]);

  return useMemo(() => {
    const target = new Date(date);
    const diff = now.getTime() - target.getTime();

    if (Number.isNaN(diff)) {
      return messages.invalid;
    }

    if (max !== undefined) {
      const maxValue =
        typeof max === 'string'
          ? DEFAULT_UNITS.find((unit) => unit.name === max)?.max
          : max;

      if (maxValue !== undefined && Math.abs(diff) > maxValue) {
        return fullDateFormatter
          ? fullDateFormatter(target)
          : target.toLocaleString();
      }
    }

    const absDiff = Math.abs(diff);
    const unit =
      DEFAULT_UNITS.find((unit) => absDiff < unit.max) ||
      DEFAULT_UNITS[DEFAULT_UNITS.length - 1];

    if (unit.name === 'second' && !showSecond) {
      return messages.justNow;
    }

    const value = absDiff / unit.value;
    const roundedValue =
      typeof rounding === 'number'
        ? Math.round(value * rounding) / rounding
        : Math[rounding](value);

    const formatter =
      messages[unit.name] || ((n: number) => `${n} ${unit.name}s`);
    const formatted =
      typeof formatter === 'function'
        ? formatter(roundedValue)
        : formatter.replace('{0}', roundedValue.toString());

    if (diff > 0) {
      return typeof messages.past === 'function'
        ? messages.past(formatted)
        : messages.past.replace('{0}', formatted);
    } 
      return typeof messages.future === 'function'
        ? messages.future(formatted)
        : messages.future.replace('{0}', formatted);
    
  }, [date, now, max, fullDateFormatter, messages, showSecond, rounding]);
}

function formatTimeAgo(
  date: Date | number | string,
  options: TimeAgoOptions = {},
): string {
  const now = new Date();
  return useTimeAgo(date, { ...options, updateInterval: 0 });
}

export { useTimeAgo, formatTimeAgo };
