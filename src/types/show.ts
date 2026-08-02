export interface Show {
  /** ISO date string, e.g. "2026-09-12" */
  date: string;
  doorTime?: string;
  showTime?: string;
  venue: string;
  city: string;
  state?: string;
  country?: string;
  ticketUrl?: string;
  lineup: string[];
  /** ISO date string, e.g. "2026-09-12" */
  announceDate?: string;
  eventName?: string;
}
