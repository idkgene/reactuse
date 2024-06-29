import { useState, useEffect, useMemo } from 'react';

interface DateFormatOptions {
  locales?: string | string[];
  customMeridiem?: (
    hours: number,
    minutes: number,
    isLowercase: boolean,
  ) => string;
  useUTC?: boolean;
}

const formatTokens: Record<string, (
    date: Date,
    locales?: string | string[],
    useUTC?: boolean,
  ) => string> = {
  // Year
  YY: (date, _, useUTC) =>
    String(useUTC ? date.getUTCFullYear() : date.getFullYear()).slice(-2),
  YYYY: (date, _, useUTC) =>
    String(useUTC ? date.getUTCFullYear() : date.getFullYear()),
  Y: (date, _, useUTC) =>
    String(useUTC ? date.getUTCFullYear() : date.getFullYear()),
  // Quarter
  Q: (date, _, useUTC) =>
    String(Math.floor((useUTC ? date.getUTCMonth() : date.getMonth()) / 3) + 1),
  Qo: (date, _, useUTC) => {
    const quarter =
      Math.floor((useUTC ? date.getUTCMonth() : date.getMonth()) / 3) + 1;
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix =
      quarter % 10 <= 3 && (quarter % 100) - (quarter % 10) !== 10
        ? suffixes[quarter % 10]
        : suffixes[0];
    return quarter + suffix;
  },
  // Month
  M: (date, _, useUTC) =>
    String((useUTC ? date.getUTCMonth() : date.getMonth()) + 1),
  Mo: (date, _, useUTC) => {
    const month = (useUTC ? date.getUTCMonth() : date.getMonth()) + 1;
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix =
      month % 10 <= 3 && (month % 100) - (month % 10) !== 10
        ? suffixes[month % 10]
        : suffixes[0];
    return month + suffix;
  },
  MM: (date, _, useUTC) =>
    String((useUTC ? date.getUTCMonth() : date.getMonth()) + 1).padStart(
      2,
      '0',
    ),
  MMM: (date, locales, useUTC) => {
    try {
      return new Intl.DateTimeFormat(locales, {
        month: 'short',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    } catch (e) {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    }
  },
  MMMM: (date, locales, useUTC) => {
    try {
      return new Intl.DateTimeFormat(locales, {
        month: 'long',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    } catch (e) {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    }
  },
  // Day of month
  D: (date, _, useUTC) => String(useUTC ? date.getUTCDate() : date.getDate()),
  Do: (date, _, useUTC) => {
    const day = useUTC ? date.getUTCDate() : date.getDate();
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix =
      day % 10 <= 3 && (day % 100) - (day % 10) !== 10
        ? suffixes[day % 10]
        : suffixes[0];
    return day + suffix;
  },
  DD: (date, _, useUTC) =>
    String(useUTC ? date.getUTCDate() : date.getDate()).padStart(2, '0'),
  DDD: (date, _, useUTC) => {
    const start = new Date(
      useUTC ? date.getUTCFullYear() : date.getFullYear(),
      0,
      0,
    );
    const diff =
      date.getTime() -
      start.getTime() +
      (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    return String(Math.floor(diff / 86400000));
  },
  DDDo: (date, _, useUTC) => {
    const dayOfYear = formatTokens.DDD(date, _, useUTC);
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix =
      Number(dayOfYear) % 10 <= 3 &&
      (Number(dayOfYear) % 100) - (Number(dayOfYear) % 10) !== 10
        ? suffixes[Number(dayOfYear) % 10]
        : suffixes[0];
    return dayOfYear + suffix;
  },
  DDDD: (date, _, useUTC) => formatTokens.DDD(date, _, useUTC).padStart(3, '0'),
  // Day of week
  d: (date, _, useUTC) => String(useUTC ? date.getUTCDay() : date.getDay()),
  do: (date, _, useUTC) => {
    const day = useUTC ? date.getUTCDay() : date.getDay();
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix =
      day % 10 <= 3 && (day % 100) - (day % 10) !== 10
        ? suffixes[day % 10]
        : suffixes[0];
    return day + suffix;
  },
  dd: (date, locales, useUTC) => {
    try {
      return new Intl.DateTimeFormat(locales, {
        weekday: 'narrow',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    } catch (e) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'narrow',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    }
  },
  ddd: (date, locales, useUTC) => {
    try {
      return new Intl.DateTimeFormat(locales, {
        weekday: 'short',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    } catch (e) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    }
  },
  dddd: (date, locales, useUTC) => {
    try {
      return new Intl.DateTimeFormat(locales, {
        weekday: 'long',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    } catch (e) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        timeZone: useUTC ? 'UTC' : undefined,
      }).format(date);
    }
  },
  E: (date, _, useUTC) =>
    String((useUTC ? date.getUTCDay() : date.getDay()) || 7),
  // Week of Year
  w: (date, _, useUTC) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return String(
      Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7),
    );
  },
  wo: (date, _, useUTC) => {
    const weekNum = formatTokens.w(date, _, useUTC);
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix =
      Number(weekNum) % 10 <= 3 &&
      (Number(weekNum) % 100) - (Number(weekNum) % 10) !== 10
        ? suffixes[Number(weekNum) % 10]
        : suffixes[0];
    return weekNum + suffix;
  },
  ww: (date, _, useUTC) => formatTokens.w(date, _, useUTC).padStart(2, '0'),
  // ISO Week of Year
  W: (date, _, useUTC) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return String(
      Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7),
    );
  },
  Wo: (date, _, useUTC) => {
    const weekNum = formatTokens.W(date, _, useUTC);
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix =
      Number(weekNum) % 10 <= 3 &&
      (Number(weekNum) % 100) - (Number(weekNum) % 10) !== 10
        ? suffixes[Number(weekNum) % 10]
        : suffixes[0];
    return weekNum + suffix;
  },
  WW: (date, _, useUTC) => formatTokens.W(date, _, useUTC).padStart(2, '0'),
  // Year
  gg: (date, _, useUTC) =>
    String(useUTC ? date.getUTCFullYear() : date.getFullYear()).slice(-2),
  gggg: (date, _, useUTC) =>
    String(useUTC ? date.getUTCFullYear() : date.getFullYear()),
  GG: (date, _, useUTC) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return String(d.getUTCFullYear()).slice(-2);
  },
  GGGG: (date, _, useUTC) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return String(d.getUTCFullYear());
  },
  // Hour, minute, second, millisecond, and offset tokens
  H: (date, _, useUTC) => String(useUTC ? date.getUTCHours() : date.getHours()),
  HH: (date, _, useUTC) =>
    String(useUTC ? date.getUTCHours() : date.getHours()).padStart(2, '0'),
  h: (date, _, useUTC) =>
    String((useUTC ? date.getUTCHours() : date.getHours()) % 12 || 12),
  hh: (date, _, useUTC) =>
    String((useUTC ? date.getUTCHours() : date.getHours()) % 12 || 12).padStart(
      2,
      '0',
    ),
  k: (date, _, useUTC) =>
    String((useUTC ? date.getUTCHours() : date.getHours()) || 24),
  kk: (date, _, useUTC) =>
    String((useUTC ? date.getUTCHours() : date.getHours()) || 24).padStart(
      2,
      '0',
    ),
  A: (date, _, useUTC) =>
    (useUTC ? date.getUTCHours() : date.getHours()) < 12 ? 'AM' : 'PM',
  a: (date, _, useUTC) =>
    (useUTC ? date.getUTCHours() : date.getHours()) < 12 ? 'am' : 'pm',
  m: (date, _, useUTC) =>
    String(useUTC ? date.getUTCMinutes() : date.getMinutes()),
  mm: (date, _, useUTC) =>
    String(useUTC ? date.getUTCMinutes() : date.getMinutes()).padStart(2, '0'),
  s: (date, _, useUTC) =>
    String(useUTC ? date.getUTCSeconds() : date.getSeconds()),
  ss: (date, _, useUTC) =>
    String(useUTC ? date.getUTCSeconds() : date.getSeconds()).padStart(2, '0'),
  S: (date, _, useUTC) =>
    String(useUTC ? date.getUTCMilliseconds() : date.getMilliseconds()).charAt(
      0,
    ),
  SS: (date, _, useUTC) =>
    String(useUTC ? date.getUTCMilliseconds() : date.getMilliseconds())
      .padStart(3, '0')
      .slice(0, 2),
  SSS: (date, _, useUTC) =>
    String(
      useUTC ? date.getUTCMilliseconds() : date.getMilliseconds(),
    ).padStart(3, '0'),
  Z: (date) => {
    const offset = date.getTimezoneOffset();
    const absOffset = Math.abs(offset);
    return (
      `${(offset < 0 ? '+' : '-') +
      String(Math.floor(absOffset / 60)).padStart(2, '0') 
      }:${ 
      String(absOffset % 60).padStart(2, '0')}`
    );
  },
  ZZ: (date) => {
    const offset = date.getTimezoneOffset();
    const absOffset = Math.abs(offset);
    return (
      (offset < 0 ? '+' : '-') +
      String(Math.floor(absOffset / 60)).padStart(2, '0') +
      String(absOffset % 60).padStart(2, '0')
    );
  },
  X: (date) => String(Math.floor(date.getTime() / 1000)),
  x: (date) => String(date.getTime()),
};

export const useDateFormat = (
  date: Date | number | string,
  format: string,
  options: DateFormatOptions = {},
) => {
  const formatDate = useMemo(() => {
    let dateObj: Date;
    try {
      dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid Date');
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid Date';
    }

    let result = format;

    // Handle escaped characters first
    result = result.replace(
      /\[([^\]]+)\]/g,
      (_, p1) => `<escaped>${p1}</escaped>`,
    );

    // Sort tokens by length (longest first) to avoid partial matches
    const sortedTokens = Object.keys(formatTokens).sort(
      (a, b) => b.length - a.length,
    );

    // Use a single regular expression for all tokens
    const tokenRegex = new RegExp(`(${sortedTokens.join('|')})`, 'g');

    result = result.replace(tokenRegex, (match) => {
      if (match in formatTokens) {
        return formatTokens[match](dateObj, options.locales, options.useUTC);
      }
      return match;
    });

    // Handle custom meridiem
    if (options.customMeridiem) {
      const hours = options.useUTC ? dateObj.getUTCHours() : dateObj.getHours();
      const minutes = options.useUTC
        ? dateObj.getUTCMinutes()
        : dateObj.getMinutes();
      result = result
        .replace(/A/g, options.customMeridiem(hours, minutes, false))
        .replace(/a/g, options.customMeridiem(hours, minutes, true));
    }

    // Restore escaped characters
    result = result.replace(/<escaped>([^<]+)<\/escaped>/g, '$1');

    return result;
  }, [date, format, options]);

  return formatDate;
};
