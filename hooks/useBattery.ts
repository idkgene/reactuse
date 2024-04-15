import { useState, useEffect } from "react";

/**
 * @interface Battery
 * @property {number} level - The current battery level, between 0 and 1.
 * @property {boolean} charging - Whether the device is currently charging.
 * @property {number} chargingTime - The amount of time the device has been charging, in seconds.
 * @property {number} dischargingTime - The amount of time the device has been discharging, in seconds.
 */
interface Battery {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

/**
 * @interface BatteryState
 * @property {number | null} level - The current battery level, between 0 and 1.
 * @property {boolean | null} charging - Whether the device is currently charging.
 * @property {number | null} charginTime - The amount of time the device has been charging, in seconds.
 * @property {number | null} dischargingTime - The amount of time the device has been discharging, in seconds.
 */
interface BatteryState {
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

/**
 * A custom React hook for tracking battery status.
 *
 * @returns {BatteryState} An object containing the current battery state.
 */
const useBattery = (): BatteryState => {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    /**
     * Updates the battery state with the latest information.
     */
    const updateBatteryState = () => {
      if ("getBattery" in navigator) {
        (navigator.getBattery as () => Promise<Battery>)().then((battery) => {
          if (battery) {
            setBatteryState({
              level: battery.level ?? null,
              charging: battery.charging ?? null,
              chargingTime: battery.chargingTime ?? null,
              dischargingTime: battery.dischargingTime ?? null,
            });
          }
        });
      }
    };

    updateBatteryState();

    /**
     * Event listener for battery status changes.
     */
    const handleBatteryChange = () => {
      updateBatteryState();
    };

    window.addEventListener("batterystatus", handleBatteryChange);

    return () => {
      window.removeEventListener("batterystatus", handleBatteryChange);
    };
  }, []);

  return batteryState;
};

export default useBattery;
