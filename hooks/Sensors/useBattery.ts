import { useState, useEffect } from "react";

interface Battery {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

interface BatteryState {
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

export const useBattery = (): BatteryState => {
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