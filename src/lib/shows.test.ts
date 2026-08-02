import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Show } from "../types/show";
import { selectUpcomingShows } from "./shows";

function makeShow(overrides: Partial<Show>): Show {
  return {
    date: "2026-07-01",
    venue: "Some Venue",
    city: "Some City",
    lineup: [],
    ...overrides,
  };
}

describe("selectUpcomingShows", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("drops shows whose date is in the past", () => {
    const shows = [makeShow({ date: "2026-06-01" }), makeShow({ date: "2026-07-01" })];
    expect(selectUpcomingShows(shows)).toEqual([shows[1]]);
  });

  it("drops shows whose announceDate hasn't happened yet", () => {
    const shows = [makeShow({ date: "2026-07-01", announceDate: "2026-07-15" })];
    expect(selectUpcomingShows(shows)).toEqual([]);
  });

  it("keeps shows whose announceDate has already passed", () => {
    const shows = [makeShow({ date: "2026-07-01", announceDate: "2026-06-01" })];
    expect(selectUpcomingShows(shows)).toEqual(shows);
  });

  it("keeps shows with no announceDate", () => {
    const shows = [makeShow({ date: "2026-07-01" })];
    expect(selectUpcomingShows(shows)).toEqual(shows);
  });

  it("sorts results ascending by date", () => {
    const later = makeShow({ date: "2026-08-01", venue: "Later Venue" });
    const sooner = makeShow({ date: "2026-07-01", venue: "Sooner Venue" });
    expect(selectUpcomingShows([later, sooner])).toEqual([sooner, later]);
  });
});
