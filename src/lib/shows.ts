import type { Show } from "../types/show";
import { isInPast } from "../utils/date";

// Loaded at build time — every JSON file Decap writes into content/shows
// becomes one entry here, no runtime fetch involved.
const modules = import.meta.glob<{ default: Show }>("/content/shows/*.json", {
  eager: true,
});

const allShows: Show[] = Object.values(modules).map((mod) => mod.default);

export function selectUpcomingShows(shows: Show[]): Show[] {
  return shows
    .filter((show) => !isInPast(show.date))
    .filter((show) => !show.announceDate || isInPast(show.announceDate))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getUpcomingShows(): Show[] {
  return selectUpcomingShows(allShows);
}
