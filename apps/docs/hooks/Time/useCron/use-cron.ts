import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

type CronCallback = () => void;

interface UseCronOptions {
  expression: string;
  onTick: CronCallback;
  timezone?: string;
}

type CronField = number | number[];

interface CronParts {
  minute: CronField;
  hour: CronField;
  dayOfMonth: CronField;
  month: CronField;
  dayOfWeek: CronField;
}

const parseField = (field: string, min: number, max: number): CronField => {
  if (field === '*') return -1;
  if (field.includes(',')) return field.split(',').map((f) => parseInt(f, 10));
  if (field.includes('-')) {
    const [start, end] = field.split('-').map((f) => parseInt(f, 10));
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  if (field.includes('/')) {
    const [start, step] = field.split('/');
    const startNum = start === '*' ? min : parseInt(start, 10);
    return Array.from(
      { length: Math.floor((max - startNum) / parseInt(step, 10)) + 1 },
      (_, i) => startNum + i * parseInt(step, 10),
    );
  }
  return parseInt(field, 10);
};

const parseCronExpression = (expression: string): CronParts => {
  const fields = expression.split(' ');
  if (fields.length !== 5) throw new Error('Invalid cron expression');
  return {
    minute: parseField(fields[0], 0, 59),
    hour: parseField(fields[1], 0, 23),
    dayOfMonth: parseField(fields[2], 1, 31),
    month: parseField(fields[3], 1, 12),
    dayOfWeek: parseField(fields[4], 0, 6),
  };
};

const isMatchingField = (value: number, field: CronField): boolean => {
  if (field === -1) return true;
  if (Array.isArray(field)) return field.includes(value);
  return value === field;
};

const getNextRunDate = (cronParts: CronParts, now: Date): Date => {
  const next = new Date(now);
  next.setSeconds(0);
  next.setMilliseconds(0);

  const increment = (unit: 'Minute' | 'Hour' | 'Date' | 'Month') => {
    switch (unit) {
      case 'Minute':
        next.setMinutes(next.getMinutes() + 1);
        break;
      case 'Hour':
        next.setHours(next.getHours() + 1);
        next.setMinutes(0);
        break;
      case 'Date':
        next.setDate(next.getDate() + 1);
        next.setHours(0);
        next.setMinutes(0);
        break;
      case 'Month':
        next.setMonth(next.getMonth() + 1);
        next.setDate(1);
        next.setHours(0);
        next.setMinutes(0);
        break;
    }
  };

  const isMatchingDate = () => {
    return (
      isMatchingField(next.getMinutes(), cronParts.minute) &&
      isMatchingField(next.getHours(), cronParts.hour) &&
      isMatchingField(next.getDate(), cronParts.dayOfMonth) &&
      isMatchingField(next.getMonth() + 1, cronParts.month) &&
      isMatchingField(next.getDay(), cronParts.dayOfWeek)
    );
  };

  while (!isMatchingDate()) {
    if (!isMatchingField(next.getMinutes(), cronParts.minute)) {
      increment('Minute');
    } else if (!isMatchingField(next.getHours(), cronParts.hour)) {
      increment('Hour');
    } else if (
      !isMatchingField(next.getDate(), cronParts.dayOfMonth) ||
      !isMatchingField(next.getDay(), cronParts.dayOfWeek)
    ) {
      increment('Date');
    } else if (!isMatchingField(next.getMonth() + 1, cronParts.month)) {
      increment('Month');
    }

    // Проверка на переход года
    if (next.getFullYear() > now.getFullYear() + 1) {
      throw new Error('No matching date found within a year');
    }
  }

  return next;
};

const useCron = ({
  expression,
  onTick,
  timezone,
}: UseCronOptions): [boolean, string, string] => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [nextRun, setNextRun] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearInterval = useCallback(() => {
    if (intervalRef.current) {
      global.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const scheduleNextRun = useCallback(() => {
    try {
      const cronParts = parseCronExpression(expression);
      const now = new Date();
      const next = getNextRunDate(cronParts, now);
      const delay = next.getTime() - now.getTime();

      clearInterval();

      intervalRef.current = global.setTimeout(() => {
        onTick();
        scheduleNextRun();
      }, delay);

      setNextRun(next.toLocaleString(undefined, { timeZone: timezone }));
    } catch (error) {
      console.error('Error parsing cron expression:', error);
      setNextRun('Invalid cron expression');
    }
  }, [expression, onTick, timezone, clearInterval]);

  useEffect(() => {
    scheduleNextRun();
    setIsRunning(true);

    return () => {
      clearInterval();
      setIsRunning(false);
    };
  }, [expression, onTick, timezone, scheduleNextRun, clearInterval]);

  const readableExpression = useMemo(() => {
    try {
      return humanReadableCron(expression);
    } catch (error) {
      return 'Invalid cron expression';
    }
  }, [expression]);

  return [isRunning, nextRun, readableExpression];
};

// Вспомогательная функция для создания читаемого описания cron-выражения
const humanReadableCron = (expression: string): string => {
  const parts = expression.split(' ');
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  let result = 'Runs ';

  if (minute !== '*') result += `at minute ${minute} `;
  if (hour !== '*') result += `of hour ${hour} `;
  if (dayOfMonth !== '*') result += `on day-of-month ${dayOfMonth} `;
  if (month !== '*') result += `in month ${month} `;
  if (dayOfWeek !== '*') result += `on day-of-week ${dayOfWeek} `;

  return result.trim();
};

export default useCron;
