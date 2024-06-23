import { useState, useEffect } from 'react';

type DateFormatOptions = {
  locales?: string | string[];
  customMeridiem?: (
    hours: number,
    minutes: number,
    isLowercase?: boolean,
    hasPeriod?: boolean,
  ) => string;
};

const formatTokens: {
  [key: string]: (date: Date, locales?: string | string[]) => string;
} = {
  YY: (date) => String(date.getFullYear()).slice(-2),
  YYYY: (date) => String(date.getFullYear()),
  M: (date) => String(date.getMonth() + 1),
  MM: (date) => String(date.getMonth() + 1).padStart(2, '0'),
  D: (date) => String(date.getDate()),
  DD: (date) => String(date.getDate()).padStart(2, '0'),
  H: (date) => String(date.getHours()),
  HH: (date) => String(date.getHours()).padStart(2, '0'),
  m: (date) => String(date.getMinutes()),
  mm: (date) => String(date.getMinutes()).padStart(2, '0'),
  s: (date) => String(date.getSeconds()),
  ss: (date) => String(date.getSeconds()).padStart(2, '0'),
  SSS: (date) => String(date.getMilliseconds()).padStart(3, '0'),
  ddd: (date, locales) =>
    date.toLocaleDateString(locales, { weekday: 'short' }),
  dddd: (date, locales) =>
    date.toLocaleDateString(locales, { weekday: 'long' }),
};

export const useDateFormat = (
  date: Date | number | string,
  format: string,
  options: DateFormatOptions = {},
) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const formatDate = () => {
      const dateObj = date instanceof Date ? date : new Date(date);
      let result = format;

      const sortedTokens = Object.keys(formatTokens).sort(
        (a, b) => b.length - a.length,
      );

      for (const token of sortedTokens) {
        const regexp = new RegExp(token, 'g');
        result = result.replace(
          regexp,
          formatTokens[token](dateObj, options.locales),
        );
      }

      if (options.customMeridiem) {
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        result = result.replace(
          /A/g,
          options.customMeridiem(hours, minutes, false, false),
        );
        result = result.replace(
          /a/g,
          options.customMeridiem(hours, minutes, true, false),
        );
        result = result.replace(
          /AA/g,
          options.customMeridiem(hours, minutes, false, true),
        );
        result = result.replace(
          /aa/g,
          options.customMeridiem(hours, minutes, true, true),
        );
      }

      setFormattedDate(result);
    };

    formatDate();
  }, [date, format, options]);

  return formattedDate;
};
