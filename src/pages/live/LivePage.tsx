import { getUpcomingShows } from "@lib/shows";
import Show from "@components/show/Show";
import styles from "./LivePage.module.css";

function LivePage() {
  const shows = getUpcomingShows();
  return (
    <>
      <title>Live & Tour Dates | Houses of Heaven</title>
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
                <Show
                  key={`${show.date}-${show.venue}`}
                  show={show}
                  index={i}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default LivePage;
