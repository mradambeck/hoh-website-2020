import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatDate, isInPast, isOlderThanMonths } from "./date";

describe("formatDate", () => {
  it("formats an ISO date as a short month and day", () => {
    expect(formatDate("2026-09-12")).toBe("Sep 12");
    expect(formatDate("2026-01-01")).toBe("Jan 1");
  });
});

describe("isInPast / isOlderThanMonths", () => {
  // Fixed "now" mid-day so same-day boundary comparisons are deterministic.
  // Written without a trailing "Z" so it's parsed as local time, matching
  // how date.ts itself builds Date objects — keeps the test timezone-agnostic.
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("isInPast returns true for a date before today", () => {
    expect(isInPast("2026-06-14")).toBe(true);
  });

  it("isInPast returns false for a date after today", () => {
    expect(isInPast("2026-06-16")).toBe(false);
  });

  it("isInPast returns true for today, since it's compared at midnight", () => {
    expect(isInPast("2026-06-15")).toBe(true);
  });

  it("isInPast returns false when given no date", () => {
    expect(isInPast(undefined)).toBe(false);
  });

  it("isOlderThanMonths returns true for a date beyond the cutoff", () => {
    expect(isOlderThanMonths("2026-01-01", 4)).toBe(true);
  });

  it("isOlderThanMonths returns false for a date within the cutoff", () => {
    expect(isOlderThanMonths("2026-05-01", 4)).toBe(false);
  });
});
