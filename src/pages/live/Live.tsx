import { getUpcomingShows } from "@lib/shows";
import Show from "@components/show/Show";
import styles from "./Live.module.css";

function Live() {
  const shows = getUpcomingShows();
  return (
    <div className={styles.livePage}>
      <section className={styles.content}>
        <h2 className={styles.header}>LIVE</h2>
        {shows.length === 0 ? (
          <p className={styles.noShows}>
            No upcoming shows are currently announced.
          </p>
        ) : (
          <ul className={styles.list}>
            {shows.map((show, i) => (
              <Show key={`${show.date}-${show.venue}`} show={show} index={i} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Live;
