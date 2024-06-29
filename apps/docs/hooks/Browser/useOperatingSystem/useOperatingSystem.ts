import { useEffect, useState } from 'react';

export type OperatingSystem =
  | 'undetermined'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux';


  const getOperatingSystem = (userAgent: string): OperatingSystem => {
  if (/(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i.test(userAgent))
    return 'macos';
  if (/(iPhone)|(iPad)|(iPod)/i.test(userAgent)) return 'ios';
  if (/(Win32)|(Win64)|(Windows)|(WinCE)/i.test(userAgent)) return 'windows';
  if (/Android/i.test(userAgent)) return 'android';
  if (/Linux/i.test(userAgent)) return 'linux';
  return 'undetermined';
};

export const useOperatingSystem = (): OperatingSystem => {
  const [operatingSystem, setOperatingSystem] =
    useState<OperatingSystem>('undetermined');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { userAgent } = window.navigator;
      setOperatingSystem(getOperatingSystem(userAgent));
    }
  }, []);

  return operatingSystem;
};
