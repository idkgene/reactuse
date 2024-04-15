import { renderHook, act } from "@testing-library/react";
import useTyping from "@hooks/useStartTyping";

describe("useTyping hook", () => {
  let mockKeyDownEvent: KeyboardEvent, mockKeyUpEvent: KeyboardEvent;

  beforeEach(() => {
    mockKeyDownEvent = new KeyboardEvent("keydown");
    mockKeyUpEvent = new KeyboardEvent("keyup");
  });

  it("should return false before any key events", () => {
    const { result } = renderHook(() => useTyping());
    expect(result.current).toBe(false);
  });

  it("should return true after a keydown event", () => {
    const { result } = renderHook(() => useTyping());

    act(() => {
      window.document.dispatchEvent(mockKeyDownEvent);
    });

    expect(result.current).toBe(true);
  });

  it("should return false after a keyup event", () => {
    const { result } = renderHook(() => useTyping());

    act(() => {
      window.document.dispatchEvent(mockKeyDownEvent);
      window.document.dispatchEvent(mockKeyUpEvent);
    });

    expect(result.current).toBe(false);
  });

  it("should clean up event listeners on unmount", () => {
    const { result, unmount } = renderHook(() => useTyping());

    act(() => {
      window.document.dispatchEvent(mockKeyDownEvent);
    });

    window.document.removeEventListener = jest.fn();

    unmount();

    expect(window.document.removeEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
    expect(window.document.removeEventListener).toHaveBeenCalledWith(
      "keyup",
      expect.any(Function)
    );
  });
});