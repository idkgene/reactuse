import { useState, useEffect, useMemo } from 'react';

type TimeAgoMessages = {
  justNow: string;
  past: string;
  future: string;
  year: string;
  month: string;
  day: string;
  week: string;
  hour: string;
  minute: string;
  second: string;
};

const DEFAULT_MESSAGES: TimeAgoMessages = {
  justNow: 'just now',
  past: '{0} ago',
  future: 'in {0}',
  year: '{0} year',
  month: '{0} month',
  day: '{0} day',
  week: '{0} week',
  hour: '{0} hour',
  minute: '{0} minute',
  second: '{0} second',
};

function formatTimeAgo(
  time: Date | number,
  options?: { messages?: Partial<TimeAgoMessages> },
): string {
  const messages = { ...DEFAULT_MESSAGES, ...options?.messages };

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  const units = [
    {
      max: 30 * SECOND,
      divisor: 1,
      past1: messages.second,
      pastN: messages.second,
      future1: messages.second,
      futureN: messages.second,
    },
    {
      max: MINUTE,
      divisor: SECOND,
      past1: messages.second,
      pastN: messages.second,
      future1: messages.second,
      futureN: messages.second,
    },
    {
      max: HOUR,
      divisor: MINUTE,
      past1: messages.minute,
      pastN: messages.minute,
      future1: messages.minute,
      futureN: messages.minute,
    },
    {
      max: DAY,
      divisor: HOUR,
      past1: messages.hour,
      pastN: messages.hour,
      future1: messages.hour,
      futureN: messages.hour,
    },
    {
      max: WEEK,
      divisor: DAY,
      past1: messages.day,
      pastN: messages.day,
      future1: messages.day,
      futureN: messages.day,
    },
    {
      max: 4 * WEEK,
      divisor: WEEK,
      past1: messages.week,
      pastN: messages.week,
      future1: messages.week,
      futureN: messages.week,
    },
    {
      max: YEAR,
      divisor: MONTH,
      past1: messages.month,
      pastN: messages.month,
      future1: messages.month,
      futureN: messages.month,
    },
    {
      max: Infinity,
      divisor: YEAR,
      past1: messages.year,
      pastN: messages.year,
      future1: messages.year,
      futureN: messages.year,
    },
  ];

  const diff = +new Date(time) - +new Date();
  const diffAbs = Math.abs(diff);

  for (const unit of units) {
    if (diffAbs < unit.max) {
      const isFuture = diff < 0;
      const x = Math.round(Math.abs(diff) / unit.divisor);
      if (x <= 1) return isFuture ? unit.future1 : unit.past1;
      return (isFuture ? messages.future : messages.past).replace(
        '{0}',
        x.toString() + ' ' + (isFuture ? unit.futureN : unit.pastN),
      );
    }
  }

  return messages.justNow;
}

export function useTimeAgo(
  time: Date | number,
  options?: { messages?: Partial<TimeAgoMessages> },
) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = useMemo(
    () => formatTimeAgo(time, options),
    [time, options, now],
  );

  return timeAgo;
}