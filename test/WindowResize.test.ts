import { renderHook, act } from "@testing-library/react";
import useWindowResize from "@hooks/useWindowResize";

describe("useWindowResize", () => {
  beforeEach(() => {
    // Mock the window properties
    Object.defineProperty(window, "innerWidth", { value: 800, writable: true });
    Object.defineProperty(window, "innerHeight", {
      value: 600,
      writable: true,
    });
    Object.defineProperty(window, "outerWidth", {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, "outerHeight", {
      value: 768,
      writable: true,
    });

    // Mock the addEventListener and removeEventListener functions
    jest.spyOn(window, "addEventListener");
    jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    // Restore the original window object
    global.window = window;
  });

  it("should return the initial window size", () => {
    const { result } = renderHook(() => useWindowResize());

    expect(result.current).toEqual({
      innerWidth: 800,
      innerHeight: 600,
      outerWidth: 1024,
      outerHeight: 768,
    });
  });

  it("should update the window size when the window is resized", () => {
    const { result } = renderHook(() => useWindowResize());

    // Simulate a window resize event
    act(() => {
      window.innerWidth = 1200;
      window.innerHeight = 900;
      window.outerWidth = 1400;
      window.outerHeight = 1050;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({
      innerWidth: 1200,
      innerHeight: 900,
      outerWidth: 1400,
      outerHeight: 1050,
    });
  });

  it("should add and remove the resize event listener", () => {
    const { unmount } = renderHook(() => useWindowResize());

    expect(global.window.addEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    unmount();

    expect(global.window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
