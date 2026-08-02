export interface NewsItem {
  title: string;
  description?: string;
  cta?: string;
  href?: string;
  image?: string;
  /** ISO date string, e.g. "2026-09-12" */
  date: string;
  /** ISO date string, e.g. "2026-09-12" — hide the item once this date has passed */
  expirationDate?: string;
}
