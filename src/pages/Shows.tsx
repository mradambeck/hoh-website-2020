import { getUpcomingShows } from "../lib/shows";
import { formatDate } from "../utils/date";

function Shows() {
  const shows = getUpcomingShows();
  return (
    <div>
      <h1>Upcoming Shows</h1>
      {shows.length === 0 ? (
        <p>No upcoming shows announced.</p>
      ) : (
        <ul>
          {shows.map((show) => (
            <li key={`${show.date}-${show.venue}`}>
              <span>{formatDate(show.date)}</span>
              {" — "}
              <span>{show.venue}</span>
              {", "}
              <span>{show.city}</span>
              {show.ticketUrl ? (
                <>
                  {" "}
                  <a href={show.ticketUrl} target="_blank" rel="noreferrer">
                    Tickets
                  </a>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Shows;
