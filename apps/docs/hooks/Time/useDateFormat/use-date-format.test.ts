import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDateFormat } from './use-date-format';

describe('useDateFormat', () => {
  const testDate = new Date('2023-05-15T14:30:45.678Z');

  it('formats year tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'YY YYYY Y'));
    expect(result.current).toBe('23 2023 2023');
  });

  it('formats quarter tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'Q Qo'));
    expect(result.current).toBe('2 2nd');
  });

  it('formats month tokens correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'M Mo MM MMM MMMM', { locales: 'en-US' }),
    );
    expect(result.current).toBe('5 5th 05 May May');
  });

  it('formats day of month tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'D Do DD'));
    expect(result.current).toBe('15 15th 15');
  });

  it('formats day of year tokens correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'DDD DDDo DDDD'),
    );
    expect(result.current).toBe('135 135th 135');
  });

  it('formats day of week tokens correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'd do dd ddd dddd E', { locales: 'en-US' }),
    );
    expect(result.current).toBe('1 1st M Mon Monday 1');
  });

  it('formats week of year tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'w wo ww'));
    expect(result.current).toBe('20 20th 20');
  });

  it('formats ISO week of year tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'W Wo WW'));
    expect(result.current).toBe('20 20th 20');
  });

  it('formats week year tokens correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'gg gggg GG GGGG'),
    );
    expect(result.current).toBe('23 2023 23 2023');
  });

  it('formats hour tokens correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'H HH h hh k kk', { useUTC: true }),
    );
    expect(result.current).toBe('14 14 2 02 14 14');
  });

  it('formats minute tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'm mm'));
    expect(result.current).toBe('30 30');
  });

  it('formats second tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 's ss'));
    expect(result.current).toBe('45 45');
  });

  it('formats fractional second tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'S SS SSS'));
    expect(result.current).toBe('6 67 678');
  });

  it('formats timezone offset tokens correctly', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'Z ZZ'));
    expect(result.current).toMatch(/^[+-]\d{2}:\d{2} [+-]\d{4}$/);
  });

  it('formats Unix timestamp tokens correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'X x', { useUTC: true }),
    );
    expect(result.current).toBe('1684160645 1684160645678');
  });

  it('handles AM/PM formatting correctly', () => {
    const { result: resultAM } = renderHook(() =>
      useDateFormat(new Date('2023-05-15T09:30:00Z'), 'h A a', {
        useUTC: true,
      }),
    );
    expect(resultAM.current).toBe('9 AM am');

    const { result: resultPM } = renderHook(() =>
      useDateFormat(new Date('2023-05-15T21:30:00Z'), 'h A a', {
        useUTC: true,
      }),
    );
    expect(resultPM.current).toBe('9 PM pm');
  });

  it('handles escaped characters correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, '[Year] YYYY [Month] MM [Day] DD', {
        useUTC: true,
      }),
    );
    expect(result.current).toBe('Year 2023 Month 05 Day 15');
  });

  it('handles mixed tokens and text correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD at HH:mm:ss', { useUTC: true }),
    );
    expect(result.current).toBe('2023-05-15 at 14:30:45');
  });

  it('handles invalid date input', () => {
    const { result } = renderHook(() =>
      useDateFormat('invalid date', 'YYYY-MM-DD'),
    );
    expect(result.current).toBe('Invalid Date');
  });

  it('handles custom locale', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'MMMM', { locales: 'fr-FR' }),
    );
    expect(result.current).toBe('mai');
  });

  it('handles UTC option', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD HH:mm:ss', { useUTC: true }),
    );
    expect(result.current).toBe('2023-05-15 14:30:45');
  });

  it('handles custom meridiem function', () => {
    const customMeridiem = (hours: number) =>
      hours < 12 ? 'morning' : 'afternoon';
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'h A', { customMeridiem }),
    );
    expect(result.current).toBe('2 afternoon');
  });

  it('handles leap years correctly', () => {
    const leapYearDate = new Date('2024-02-29T12:00:00Z');
    const { result } = renderHook(() =>
      useDateFormat(leapYearDate, 'YYYY-MM-DD DDD', { useUTC: true }),
    );
    expect(result.current).toBe('2024-02-29 60');
  });

  it('handles date at year boundary', () => {
    const yearEndDate = new Date('2023-12-31T23:59:59.999Z');
    const { result } = renderHook(() =>
      useDateFormat(yearEndDate, 'YYYY-MM-DD HH:mm:ss.SSS', { useUTC: true }),
    );
    expect(result.current).toBe('2023-12-31 23:59:59.999');
  });

  it('handles very old dates', () => {
    const oldDate = new Date('1900-01-01T00:00:00Z');
    const { result } = renderHook(() => useDateFormat(oldDate, 'YYYY-MM-DD'));
    expect(result.current).toBe('1900-01-01');
  });

  it('handles future dates', () => {
    const futureDate = new Date('2100-12-31T23:59:59Z');
    const { result } = renderHook(() =>
      useDateFormat(futureDate, 'YYYY-MM-DD HH:mm:ss'),
    );
    expect(result.current).toBe('2100-12-31 23:59:59');
  });

  it('handles all tokens in a single format string', () => {
    const { result } = renderHook(() =>
      useDateFormat(
        testDate,
        'YY YYYY Y Q Qo M Mo MM MMM MMMM D Do DD DDD DDDo DDDD d do dd ddd dddd E w wo ww W Wo WW gg gggg GG GGGG H HH h hh k kk A a m mm s ss S SS SSS Z ZZ X x',
      ),
    );
    expect(result.current).toMatch(
      /^23 2023 2023 2 2nd 5 5th 05 May May 15 15th 15 135 135th 135 1 1st Mo Mon Monday 1 20 20th 20 20 20th 20 23 2023 23 2023 14 14 2 02 14 14 PM pm 30 30 45 45 6 67 678 [+-]\d{2}:\d{2} [+-]\d{4} \d{10} \d{13}$/,
    );
  });

  it('handles repeated tokens correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY YYYY MM MM DD DD'),
    );
    expect(result.current).toBe('2023 2023 05 05 15 15');
  });

  it('handles empty format string', () => {
    const { result } = renderHook(() => useDateFormat(testDate, ''));
    expect(result.current).toBe('');
  });

  it('handles format string with only literals', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, '[This is a test]'),
    );
    expect(result.current).toBe('This is a test');
  });

  it('handles changing date input', () => {
    const { result, rerender } = renderHook(
      ({ date }) => useDateFormat(date, 'YYYY-MM-DD'),
      { initialProps: { date: testDate } },
    );
    expect(result.current).toBe('2023-05-15');

    const newDate = new Date('2024-01-01T00:00:00Z');
    rerender({ date: newDate });
    expect(result.current).toBe('2024-01-01');
  });

  it('handles changing format string', () => {
    const { result, rerender } = renderHook(
      ({ format }) => useDateFormat(testDate, format),
      { initialProps: { format: 'YYYY-MM-DD' } },
    );
    expect(result.current).toBe('2023-05-15');

    rerender({ format: 'DD/MM/YYYY' });
    expect(result.current).toBe('15/05/2023');
  });

  it('handles changing options', () => {
    const { result, rerender } = renderHook(
      ({ options }) => useDateFormat(testDate, 'YYYY-MM-DD HH:mm:ss', options),
      { initialProps: { options: { useUTC: false } } },
    );
    const initialResult = result.current;

    rerender({ options: { useUTC: true } });
    expect(result.current).not.toBe(initialResult);
  });

  it('handles date input as number (timestamp)', () => {
    const timestamp = testDate.getTime();
    const { result } = renderHook(() =>
      useDateFormat(timestamp, 'YYYY-MM-DD HH:mm:ss'),
    );
    expect(result.current).toBe('2023-05-15 14:30:45');
  });

  it('handles date input as string', () => {
    const dateString = '2023-05-15T14:30:45.678Z';
    const { result } = renderHook(() =>
      useDateFormat(dateString, 'YYYY-MM-DD HH:mm:ss.SSS'),
    );
    expect(result.current).toBe('2023-05-15 14:30:45.678');
  });

  it('handles invalid format tokens gracefully', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD INVALID HH:mm:ss'),
    );
    expect(result.current).toBe('2023-05-15 INVALID 14:30:45');
  });

  it('handles daylight saving time transitions', () => {
    // Note: This test assumes a timezone with DST. It may fail in timezones without DST.
    const dstDate = new Date('2023-03-12T02:30:00'); // Around when DST typically starts in the US
    const { result } = renderHook(() =>
      useDateFormat(dstDate, 'YYYY-MM-DD HH:mm:ss Z'),
    );
    expect(result.current).toMatch(/^2023-03-12 02:30:00 [-+]\d{2}:\d{2}$/);
  });

  it('handles week numbers correctly', () => {
    const dates = [
      new Date('2023-01-01T00:00:00Z'), // Sunday, Week 1
      new Date('2023-06-15T00:00:00Z'), // Thursday, Week 24
      new Date('2023-12-31T00:00:00Z'), // Sunday, Week 52
    ];

    const results = dates.map((date) => {
      const { result } = renderHook(() =>
        useDateFormat(date, 'YYYY-MM-DD W', { useUTC: true }),
      );
      return result.current;
    });

    expect(results).toEqual(['2023-01-01 1', '2023-06-15 24', '2023-12-31 52']);
  });

  it('handles ordinal numbers correctly', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'Do Mo Qo wo Wo'),
    );
    expect(result.current).toBe('15th 5th 2nd 20th 20th');
  });

  it('handles 24-hour time format correctly', () => {
    const midnight = new Date('2023-05-15T00:00:00Z');
    const noon = new Date('2023-05-15T12:00:00Z');
    const { result: resultMidnight } = renderHook(() =>
      useDateFormat(midnight, 'H HH k kk'),
    );
    const { result: resultNoon } = renderHook(() =>
      useDateFormat(noon, 'H HH k kk'),
    );
    expect(resultMidnight.current).toBe('0 00 24 24');
    expect(resultNoon.current).toBe('12 12 12 12');
  });

  it('handles fractional seconds with different precisions', () => {
    const dateWithMs = new Date('2023-05-15T14:30:45.123Z');
    const { result } = renderHook(() =>
      useDateFormat(dateWithMs, 'S SS SSS SSSS SSSSS'),
    );
    expect(result.current).toBe('1 12 123 1230 12300');
  });

  it('handles very long format strings', () => {
    const longFormat = 'YYYY-MM-DD '.repeat(100);
    const { result } = renderHook(() => useDateFormat(testDate, longFormat));
    expect(result.current).toBe('2023-05-15 '.repeat(100).trim());
  });

  it('handles format with all possible tokens', () => {
    const allTokensFormat =
      'YYYY YY MMMM MMM MM M DDDD DDD DD D HH H hh h mm m ss s SSS Z ZZ DDD W AA aa Q x X';
    const { result } = renderHook(() =>
      useDateFormat(testDateUTC, allTokensFormat, { useUTC: true }),
    );

    const parts = result.current.split(' ');
    expect(parts).toHaveLength(28);
    expect(parts[0]).toBe('2024');
    expect(parts[1]).toBe('24');
    expect(parts[2]).toBe('June');
    expect(parts[3]).toBe('Jun');
    expect(parts[4]).toBe('06');
    expect(parts[5]).toBe('6');
    expect(parts[6]).toBe('Tuesday');
    expect(parts[7]).toBe('Tue');
    expect(parts[8]).toBe('25');
    expect(parts[9]).toBe('25');
    expect(parts[10]).toBe('12');
    expect(parts[11]).toBe('12');
    expect(parts[12]).toBe('12');
    expect(parts[13]).toBe('12');
    expect(parts[14]).toBe('34');
    expect(parts[15]).toBe('34');
    expect(parts[16]).toBe('56');
    expect(parts[17]).toBe('56');
    expect(parts[18]).toBe('789');
    expect(parts[19]).toBe('+00:00');
    expect(parts[20]).toBe('+0000');
    expect(parts[21]).toBe('177');
    expect(parts[22]).toBe('26');
    expect(parts[23]).toBe('PM');
    expect(parts[24]).toBe('pm');
    expect(parts[25]).toBe('2');
    expect(parts[26]).toBe(testDateUTC.getTime().toString());
    expect(parts[27]).toBe(Math.floor(testDateUTC.getTime() / 1000).toString());
  });

  it('handles performance for multiple simultaneous hooks', () => {
    const start = performance.now();
    const hooks = Array(1000)
      .fill(null)
      .map(() =>
        renderHook(() => useDateFormat(testDate, 'YYYY-MM-DD HH:mm:ss')),
      );
    const end = performance.now();

    hooks.forEach((hook) => {
      expect(hook.result.current).toBe('2024-06-25 12:34:56');
    });

    expect(end - start).toBeLessThan(1000); // Expecting less than 1 second for 1000 hooks
  });

  it('handles concurrent updates correctly', async () => {
    const { result, rerender } = renderHook(
      ({ date, format }) => useDateFormat(date, format),
      { initialProps: { date: testDate, format: 'YYYY-MM-DD' } },
    );

    expect(result.current).toBe('2024-06-25');

    // Simulate concurrent updates
    rerender({ date: new Date('2025-01-01T00:00:00Z'), format: 'YYYY-MM-DD' });
    rerender({ date: testDate, format: 'DD/MM/YYYY' });

    // Wait for all updates to process
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current).toBe('25/06/2024');
  });

  it('handles date objects with custom properties', () => {
    const customDate = new Date('2024-06-25T12:34:56.789Z');
    (customDate as any).customProperty = 'test';

    const { result } = renderHook(() =>
      useDateFormat(customDate, 'YYYY-MM-DD'),
    );

    expect(result.current).toBe('2024-06-25');
  });

  it('handles dates before 1970 and after 2038', () => {
    const pastDate = new Date('1900-01-01T00:00:00Z');
    const futureDate = new Date('2100-12-31T23:59:59Z');

    const { result: pastResult } = renderHook(() =>
      useDateFormat(pastDate, 'YYYY-MM-DD'),
    );
    const { result: futureResult } = renderHook(() =>
      useDateFormat(futureDate, 'YYYY-MM-DD'),
    );

    expect(pastResult.current).toBe('1900-01-01');
    expect(futureResult.current).toBe('2100-12-31');
  });

  it('handles format string with repeated escaped characters', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD[T]HH:mm:ss[Z][Z][Z]'),
    );
    expect(result.current).toBe('2024-06-25T12:34:56ZZZ');
  });

  it('handles format string with mixed case tokens', () => {
    const { result } = renderHook(() => useDateFormat(testDate, 'yYyY-mM-dD'));
    expect(result.current).toBe('2024-06-25');
  });

  it('handles extremely short intervals between date changes', async () => {
    const { result, rerender } = renderHook(
      ({ date }) => useDateFormat(date, 'HH:mm:ss.SSS'),
      { initialProps: { date: new Date('2024-06-25T12:34:56.789Z') } },
    );

    expect(result.current).toBe('12:34:56.789');

    for (let i = 0; i < 100; i++) {
      rerender({ date: new Date(`2024-06-25T12:34:56.${789 + i}Z`) });
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    expect(result.current).toBe('12:34:56.888');
  });

  it('handles invalid Date objects gracefully', () => {
    const invalidDate = new Date('Invalid Date');

    const { result } = renderHook(() =>
      useDateFormat(invalidDate, 'YYYY-MM-DD'),
    );

    expect(result.current).toBe('Invalid Date');
  });

  it('handles changing timezone offsets', () => {
    // Mock timezone change
    const originalOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = jest.fn(() => -60); // UTC+1

    const { result, rerender } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD HH:mm Z'),
    );

    expect(result.current).toMatch(/2024-06-25 13:34 \+01:00/);

    // Change mocked timezone
    (Date.prototype.getTimezoneOffset as jest.Mock).mockReturnValue(60); // UTC-1

    rerender();

    expect(result.current).toMatch(/2024-06-25 11:34 -01:00/);

    // Restore original method
    Date.prototype.getTimezoneOffset = originalOffset;
  });

  it('handles non-standard date inputs', () => {
    const { result: resultArray } = renderHook(() =>
      useDateFormat([2024, 5, 25] as any, 'YYYY-MM-DD'),
    );
    expect(resultArray.current).toBe('Invalid Date');

    const { result: resultObject } = renderHook(() =>
      useDateFormat({ year: 2024, month: 6, day: 25 } as any, 'YYYY-MM-DD'),
    );
    expect(resultObject.current).toBe('Invalid Date');
  });

  it('handles format string with unicode characters', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY年MM月DD日'),
    );
    expect(result.current).toBe('2024年06月25日');
  });

  it('handles format string with emojis', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD 🕒HH:mm:ss'),
    );
    expect(result.current).toBe('2024-06-25 🕒12:34:56');
  });

  it('handles very old dates', () => {
    const veryOldDate = new Date('0001-01-01T00:00:00Z');
    const { result } = renderHook(() =>
      useDateFormat(veryOldDate, 'YYYY-MM-DD'),
    );
    expect(result.current).toBe('0001-01-01');
  });

  it('handles very future dates', () => {
    const veryFutureDate = new Date('9999-12-31T23:59:59Z');
    const { result } = renderHook(() =>
      useDateFormat(veryFutureDate, 'YYYY-MM-DD HH:mm:ss'),
    );
    expect(result.current).toBe('9999-12-31 23:59:59');
  });

  it('handles format string with all spaces', () => {
    const { result } = renderHook(() => useDateFormat(testDate, '    '));
    expect(result.current).toBe('    ');
  });

  it('handles changing locales', () => {
    const { result, rerender } = renderHook(
      ({ locale }) => useDateFormat(testDate, 'MMMM', { locales: locale }),
      { initialProps: { locale: 'en-US' } },
    );

    expect(result.current).toBe('June');

    rerender({ locale: 'fr-FR' });
    expect(result.current).toBe('juin');

    rerender({ locale: 'ja-JP' });
    expect(result.current).toBe('6月');
  });

  it('handles invalid locales gracefully', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'MMMM', { locales: 'invalid-locale' }),
    );
    expect(result.current).toMatch(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)$/,
    );
  });

  it('handles format string with repeated tokens', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY YYYY MM MM DD DD HH HH mm mm ss ss'),
    );
    expect(result.current).toBe('2024 2024 06 06 25 25 12 12 34 34 56 56');
  });

  it('handles format string with tokens inside escaped brackets', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, '[YYYY] MM [DD] HH:mm:ss'),
    );
    expect(result.current).toBe('YYYY 06 DD 12:34:56');
  });

  it('handles format string with nested brackets', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD [HH:mm:ss [nested]]'),
    );
    expect(result.current).toBe('2024-06-25 HH:mm:ss [nested]');
  });

  it('handles format string with unmatched brackets', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD [HH:mm:ss'),
    );
    expect(result.current).toBe('2024-06-25 HH:mm:ss');
  });

  it('handles format string with escaped backslashes', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD [\\HH:mm:ss]'),
    );
    expect(result.current).toBe('2024-06-25 \\HH:mm:ss');
  });

  it('handles changing between UTC and non-UTC', () => {
    const { result, rerender } = renderHook(
      ({ useUTC }) => useDateFormat(testDate, 'YYYY-MM-DD HH:mm Z', { useUTC }),
      { initialProps: { useUTC: false } },
    );

    const initialResult = result.current;

    rerender({ useUTC: true });
    const utcResult = result.current;

    expect(initialResult).not.toBe(utcResult);
    expect(utcResult).toBe('2024-06-25 12:34 +00:00');
  });

  it('handles performance for long format strings', () => {
    const longFormat = 'YYYY-MM-DD '.repeat(1000);
    const start = performance.now();
    const { result } = renderHook(() => useDateFormat(testDate, longFormat));
    const end = performance.now();

    expect(result.current).toBe('2024-06-25 '.repeat(1000).trim());
    expect(end - start).toBeLessThan(100); // Expecting less than 100ms
  });

  it('handles concurrent format changes correctly', async () => {
    const { result, rerender } = renderHook(
      ({ format }) => useDateFormat(testDate, format),
      { initialProps: { format: 'YYYY-MM-DD' } },
    );

    expect(result.current).toBe('2024-06-25');

    // Simulate concurrent format changes
    rerender({ format: 'MM/DD/YYYY' });
    rerender({ format: 'DD.MM.YYYY' });
    rerender({ format: 'YYYY/MM/DD' });

    // Wait for all updates to process
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current).toBe('2024/06/25');
  });

  it('handles date input as ISO string', () => {
    const isoString = '2024-06-25T12:34:56.789Z';
    const { result } = renderHook(() =>
      useDateFormat(isoString, 'YYYY-MM-DD HH:mm:ss.SSS'),
    );
    expect(result.current).toBe('2024-06-25 12:34:56.789');
  });

  it('handles date input as Unix timestamp', () => {
    const timestamp = 1719500096789; // 2024-06-25T12:34:56.789Z
    const { result } = renderHook(() =>
      useDateFormat(timestamp, 'YYYY-MM-DD HH:mm:ss.SSS'),
    );
    expect(result.current).toBe('2024-06-25 12:34:56.789');
  });

  it('handles custom meridiem function with all cases', () => {
    const customMeridiem = (
      hours: number,
      minutes: number,
      isLowercase: boolean,
      hasPeriod: boolean,
    ) => {
      const base = hours < 12 ? 'AM' : 'PM';
      let result = isLowercase ? base.toLowerCase() : base;
      if (hasPeriod) result = result.split('').join('.');
      return `${result}-${hours}:${minutes}`;
    };

    const { result } = renderHook(() =>
      useDateFormat(testDate, 'hh:mm A a AA aa', { customMeridiem }),
    );
    expect(result.current).toBe(
      '12:34 PM-12:34 pm-12:34 P.M.-12:34 p.m.-12:34',
    );
  });

  it('handles format string with only literals', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, '[This is] [a] [test]'),
    );
    expect(result.current).toBe('This is a test');
  });

  it('handles extreme time values', () => {
    const extremeDate = new Date('2024-06-25T23:59:59.999Z');
    const { result } = renderHook(() =>
      useDateFormat(extremeDate, 'HH:mm:ss.SSS'),
    );
    expect(result.current).toBe('23:59:59.999');
  });

  it('handles format string with mixed valid and invalid tokens', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'YYYY-MM-DD INVALID HH:mm:ss'),
    );
    expect(result.current).toBe('2024-06-25 INVALID 12:34:56');
  });

  it('handles changing date and format simultaneously', () => {
    const { result, rerender } = renderHook(
      ({ date, format }) => useDateFormat(date, format, { useUTC: true }),
      { initialProps: { date: testDate, format: 'YYYY-MM-DD' } },
    );

    expect(result.current).toBe('2023-05-15');

    const newDate = new Date('2025-01-01T00:00:00Z');
    rerender({ date: newDate, format: 'DD/MM/YYYY' });

    expect(result.current).toBe('01/01/2025');
  });

  it('handles format string with only invalid tokens', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'INVALID TOKENS', { useUTC: true }),
    );
    expect(result.current).toBe('INVALID TOKENS');
  });

  it('handles very short format strings', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, 'Y', { useUTC: true }),
    );
    expect(result.current).toBe('2023');
  });

  it('handles date crossing year boundary', () => {
    const yearEndDate = new Date('2024-12-31T23:59:59.999Z');
    const { result, rerender } = renderHook(
      ({ date }) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss.SSS'),
      { initialProps: { date: yearEndDate } },
    );

    expect(result.current).toBe('2024-12-31 23:59:59.999');

    const newYearDate = new Date('2025-01-01T00:00:00.000Z');
    rerender({ date: newYearDate });

    expect(result.current).toBe('2025-01-01 00:00:00.000');
  });

  it('handles format string with multiple consecutive literals', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, '[Year:] YYYY [Month:] MM [Day:] DD', {
        useUTC: true,
      }),
    );
    expect(result.current).toBe('Year: 2024 Month: 06 Day: 25');
  });

  it('handles date with time zone offset', () => {
    const dateWithOffset = new Date('2024-06-25T12:34:56+05:30');
    const { result } = renderHook(() =>
      useDateFormat(dateWithOffset, 'YYYY-MM-DD HH:mm:ss Z'),
    );
    // The exact output will depend on the system's time zone
    expect(result.current).toMatch(
      /^2024-06-25 \d{2}:\d{2}:\d{2} [-+]\d{2}:\d{2}$/,
    );
  });

  it('handles format string with escaped characters at the beginning and end', () => {
    const { result } = renderHook(() =>
      useDateFormat(testDate, '[Start] YYYY-MM-DD [End]', { useUTC: true }),
    );
    expect(result.current).toBe('Start 2024-06-25 End');
  });

  it('handles changing options multiple times', () => {
    const { result, rerender } = renderHook(
      ({ options }) => useDateFormat(testDate, 'YYYY-MM-DD HH:mm Z', options),
      { initialProps: { options: { useUTC: false } } },
    );

    const initialResult = result.current;

    rerender({ options: { useUTC: true } });
    const utcResult = result.current;

    rerender({ options: { useUTC: false, locales: 'fr-FR' } });
    const frResult = result.current;

    expect(initialResult).not.toBe(utcResult);
    expect(utcResult).toBe('2024-06-25 12:34 +00:00');
    expect(frResult).not.toBe(utcResult);
  });

  it('handles performance for multiple rerenders', () => {
    const { result, rerender } = renderHook(
      ({ date }) =>
        useDateFormat(date, 'YYYY-MM-DD HH:mm:ss', { useUTC: true }),
      { initialProps: { date: testDate } },
    );

    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      rerender({ date: new Date(testDate.getTime() + i * 1000) });
    }
    const end = performance.now();

    expect(end - start).toBeLessThan(1000); // Expecting less than 1 second for 1000 rerenders
    expect(result.current).toBe('2024-06-25 12:50:55');
  });
});
