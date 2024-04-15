import { renderHook, act } from "@testing-library/react";
import useBattery from "@hooks/useBattery";

describe("useBattery", () => {
  it("should update state when battery status changes", async () => {
    // Mock the navigator.getBattery function
    const mockBattery = {
      level: 0.5,
      charging: true,
      chargingTime: 100,
      dischargingTime: 200,
    };
    const mockGetBattery = jest.fn().mockResolvedValue(mockBattery);
    Object.defineProperty(navigator, "getBattery", {
      value: mockGetBattery,
    });

    const { result } = renderHook(() => useBattery());

    expect(result.current).toEqual({
      level: null,
      charging: null,
      chargingTime: null,
      dischargingTime: null,
    });

    // Trigger the battery status change event
    const event = new Event("batterystatus");
    act(() => {
      window.dispatchEvent(event);
    });

    // Wait for the state to update
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current).toEqual(mockBattery);
  });
});