import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NewsItem } from "../types/news";
import { selectRecentNews } from "./news";

function makeNews(overrides: Partial<NewsItem>): NewsItem {
  return {
    title: "Some News",
    date: "2026-06-01",
    ...overrides,
  };
}

describe("selectRecentNews", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("drops items whose expirationDate has passed", () => {
    const news = [makeNews({ title: "Expired", expirationDate: "2026-06-01" })];
    expect(selectRecentNews(news)).toEqual([]);
  });

  it("keeps items with no expirationDate", () => {
    const news = [makeNews({ title: "No expiration" })];
    expect(selectRecentNews(news)).toEqual(news);
  });

  it("drops items older than the 4-month window", () => {
    const news = [makeNews({ title: "Old", date: "2026-01-01" })];
    expect(selectRecentNews(news)).toEqual([]);
  });

  it("sorts results descending by date", () => {
    const older = makeNews({ title: "Older", date: "2026-05-01" });
    const newer = makeNews({ title: "Newer", date: "2026-06-10" });
    expect(selectRecentNews([older, newer])).toEqual([newer, older]);
  });

  it("caps results at 3 items", () => {
    const news = [
      makeNews({ title: "A", date: "2026-06-01" }),
      makeNews({ title: "B", date: "2026-06-02" }),
      makeNews({ title: "C", date: "2026-06-03" }),
      makeNews({ title: "D", date: "2026-06-04" }),
    ];
    expect(selectRecentNews(news)).toHaveLength(3);
    expect(selectRecentNews(news).map((item) => item.title)).toEqual(["D", "C", "B"]);
  });
});
