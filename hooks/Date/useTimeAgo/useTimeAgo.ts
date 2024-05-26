// ihatethis
import { useEffect, useMemo, useState } from 'react'

export type UseTimeAgoFormatter<T = number> = (
  value: T,
  isPast: boolean
) => string

export type UseTimeAgoUnitNamesDefault =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export interface UseTimeAgoMessagesBuiltIn {
  justNow: string
  past: string | UseTimeAgoFormatter<string | number>
  future: string | UseTimeAgoFormatter<string | number>
  invalid: string
}

export type UseTimeAgoMessages<
  UnitNames extends string = UseTimeAgoUnitNamesDefault,
> = UseTimeAgoMessagesBuiltIn &
  Record<UnitNames, string | UseTimeAgoFormatter<number>>

export interface FormatTimeAgoOptions<
  UnitNames extends string = UseTimeAgoUnitNamesDefault,
> {
  max?: UnitNames | number
  fullDateFormatter?: (date: Date) => string
  messages?: UseTimeAgoMessages<UnitNames>
  showSecond?: boolean
  rounding?: 'round' | 'ceil' | 'floor' | number
  units?: UseTimeAgoUnit<UnitNames>[]
}

export interface UseTimeAgoOptions<
  UnitNames extends string = UseTimeAgoUnitNamesDefault,
> extends FormatTimeAgoOptions<UnitNames> {
  updateInterval?: number
}

export interface UseTimeAgoUnit<
  Unit extends string = UseTimeAgoUnitNamesDefault,
> {
  max: number
  value: number
  name: Unit
}

const DEFAULT_UNITS: UseTimeAgoUnit[] = [
  { max: 60000, value: 1000, name: 'second' },
  { max: 3600000, value: 60000, name: 'minute' },
  { max: 86400000, value: 3600000, name: 'hour' },
  { max: 604800000, value: 86400000, name: 'day' },
  { max: 2629800000, value: 604800000, name: 'week' },
  { max: 31557600000, value: 2629800000, name: 'month' },
  { max: Infinity, value: 31557600000, name: 'year' },
]

const DEFAULT_MESSAGES: UseTimeAgoMessages = {
  justNow: 'just now',
  past: (value) => `${value} ago`,
  future: (value) => `in ${value}`,
  invalid: 'Invalid Date',
  second: 'second',
  minute: 'minute',
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
}

export function useTimeAgo<
  UnitNames extends string = UseTimeAgoUnitNamesDefault,
>(
  time: Date | number | string,
  options: UseTimeAgoOptions<UnitNames> = {}
): string {
  const {
    max,
    fullDateFormatter,
    messages = DEFAULT_MESSAGES,
    showSecond = false,
    rounding = 'round',
    units = DEFAULT_UNITS,
    updateInterval = 30000,
  } = options

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date())
    }, updateInterval)

    return () => {
      clearInterval(intervalId)
    }
  }, [updateInterval])

  const timeAgo = useMemo(() => {
    const timeMs = typeof time === 'number' ? time : new Date(time).getTime()
    const diff = now.getTime() - timeMs

    if (isNaN(diff)) {
      return messages.invalid
    }

    const isPast = diff > 0
    const absDiff = Math.abs(diff)

    if (absDiff < 6000) {
      return messages.justNow
    }

    if (typeof max === 'number' && absDiff > max) {
      return fullDateFormatter
        ? fullDateFormatter(new Date(timeMs))
        : new Date(timeMs).toISOString()
    }

    const unit =
      units.find((unit) => absDiff < unit.max) || units[units.length - 1]

    if (unit.name === 'second' && !showSecond) {
      return messages.justNow
    }

    const getRoundingMethod = (
      rounding:
        | 'round'
        | 'ceil'
        | 'floor'
        | number
        | ((value: number) => number)
    ): ((value: number) => number) => {
      if (typeof rounding === 'function') {
        return rounding
      } else if (typeof rounding === 'string' && rounding in Math) {
        return (value: number) => Math[rounding](value)
      } else {
        throw new Error(`Invalid rounding method: ${rounding}`)
      }
    }

    const roundingMethod = getRoundingMethod(rounding)
    const value = roundingMethod(absDiff / unit.value)
    const formatter = messages[unit.name as keyof typeof messages] as
      | string
      | UseTimeAgoFormatter<number>

    if (typeof formatter === 'function') {
      return formatter(value, isPast)
    }

    return `${isPast ? messages.past : messages.future} ${value} ${formatter}${value !== 1 ? 's' : ''}`
  }, [time, now, max, fullDateFormatter, messages, showSecond, rounding, units])

  return timeAgo
}