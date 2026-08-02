import type { NewsItem } from "../types/news";
import { isInPast, isOlderThanMonths } from "../utils/date";

// Loaded at build time — every JSON file Decap writes into content/news
// becomes one entry here, no runtime fetch involved.
const modules = import.meta.glob<{ default: NewsItem }>("/content/news/*.json", {
  eager: true,
});

const allNews: NewsItem[] = Object.values(modules).map((mod) => mod.default);

const MAX_RECENT_ITEMS = 3;
const MAX_AGE_MONTHS = 4;

export function selectRecentNews(news: NewsItem[]): NewsItem[] {
  return news
    .filter((item) => !item.expirationDate || !isInPast(item.expirationDate))
    .filter((item) => !isOlderThanMonths(item.date, MAX_AGE_MONTHS))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_RECENT_ITEMS);
}

export function getRecentNews(): NewsItem[] {
  return selectRecentNews(allNews);
}
