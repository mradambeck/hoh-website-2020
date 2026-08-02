import { motion } from "motion/react";

import ButtonLink from "@components/button-link/ButtonLink";

import type { Show as ShowType } from "@types";
import { formatDate } from "@utils/date";
import styles from "./Show.module.css";

interface Props {
  show: ShowType;
  // Used for animation delay:
  index: number;
}

const Show = ({ show, index }: Props) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3, ease: "easeInOut" }}
    >
      <div className={styles.show}>
        <div className={styles.content}>
          <div className={[styles.date, styles.withDivider].join(" ")}>
            {formatDate(show.date)}
            {/* <div className={styles.year}>{show.date.slice(0, 4)}</div> */}
          </div>

          <div className={[styles.locCol, styles.withDivider].join(" ")}>
            <div className={styles.location}>
              {show.city}
              {show.state ? `, ${show.state}` : ""}
              {show.country ? `, ${show.country}` : ""}
            </div>
            <div className={styles.venue}>{show.venue}</div>
          </div>
          <div className={[styles.lineup, styles.withDivider].join(" ")}>
            {show.eventName ? (
              <div className={styles.eventName}>{show.eventName}</div>
            ) : (
              ""
            )}
            {show.lineup.length ? (
              <div
                className={styles.lineup}
              >{`w/ ${show.lineup.join(", ")}`}</div>
            ) : (
              ""
            )}
          </div>
          <div className={[styles.time, styles.withDivider].join(" ")}>
            {show.doorTime && (
              <div className={styles.dateTime}>
                {show.showTime ? `Doors: ${show.doorTime}` : `${show.doorTime}`}
              </div>
            )}
            {show.showTime && (
              <div className={styles.dateTime}>
                {show.doorTime ? `Show: ${show.showTime}` : `${show.showTime}`}
              </div>
            )}
          </div>
          {show.ticketUrl ? (
            <ButtonLink href={show.ticketUrl}>Tickets</ButtonLink>
          ) : null}
        </div>
      </div>
    </motion.li>
  );
};

export default Show;
