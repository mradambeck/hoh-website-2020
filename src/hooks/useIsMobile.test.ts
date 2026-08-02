import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "./useIsMobile";

type Listener = (event: { matches: boolean }) => void;

function stubMatchMedia(initialMatches: boolean) {
  let listener: Listener | null = null;
  const mql = {
    matches: initialMatches,
    addEventListener: vi.fn((_event: string, cb: Listener) => {
      listener = cb;
    }),
    removeEventListener: vi.fn(() => {
      listener = null;
    }),
  };

  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => mql),
  );

  return {
    trigger(matches: boolean) {
      mql.matches = matches;
      listener?.({ matches });
    },
    mql,
  };
}

describe("useIsMobile", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reflects the initial matchMedia result", () => {
    stubMatchMedia(true);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when the media query change event fires", () => {
    const { trigger } = stubMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      trigger(true);
    });

    expect(result.current).toBe(true);
  });

  it("removes its change listener on unmount", () => {
    const { mql } = stubMatchMedia(false);
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
