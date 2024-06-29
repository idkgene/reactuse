import { useEffect, useState } from 'react';

export interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}
declare global {
  interface Navigator {
    readonly getBattery: () => Promise<BatteryManager>;
  }
}

interface UseBatteryStateReturn {
  supported: boolean;
  loading: boolean;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export const useBattery = () => {
  const [state, setState] = useState<UseBatteryStateReturn>({
    supported: false,
    loading: true,
    level: 0,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
  });

  useEffect(() => {
    const isSupported =
      navigator &&
      'getBattery' in navigator &&
      typeof navigator.getBattery === 'function';
    if (!isSupported) { setState({ ...state, loading: false }); return; }

    let battery: BatteryManager | null;

    const handleChange = () =>
      { setState({
        supported: true,
        loading: false,
        level: battery?.level ?? 0,
        charging: battery?.charging ?? false,
        dischargingTime: battery?.dischargingTime ?? 0,
        chargingTime: battery?.chargingTime ?? 0,
      }); };

    navigator.getBattery().then((batteryManager) => {
      battery = batteryManager;
      handleChange();

      batteryManager.addEventListener('levelchange', handleChange);
      batteryManager.addEventListener('chargingchange', handleChange);
      batteryManager.addEventListener('chargingtimechange', handleChange);
      batteryManager.addEventListener('dischargingtimechange', handleChange);
    });

    return () => {
      if (!battery) return;
      battery.removeEventListener('levelchange', handleChange);
      battery.removeEventListener('chargingchange', handleChange);
      battery.removeEventListener('chargingtimechange', handleChange);
      battery.removeEventListener('dischargingtimechange', handleChange);
    };
  }, []);

  return state;
};
