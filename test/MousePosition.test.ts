import { renderHook, act } from "@testing-library/react";
import useMousePosition from "@hooks/useMousePosition";

describe("useMousePosition", () => {
  it("should return the current mouse position", () => {
    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: 100,
        clientY: 200,
      });
      window.dispatchEvent(mouseEvent);
    });

    expect(result.current).toEqual({ x: 100, y: 200 });
  });

  it("should clean up the event listener on unmount", () => {
    const { unmount } = renderHook(() => useMousePosition());

    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );
  });
});
