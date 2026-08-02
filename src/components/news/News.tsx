import { motion, type Variants } from "motion/react";

import { getRecentNews } from "@lib/news";
import ButtonLink from "@components/button-link/ButtonLink";
import styles from "./News.module.css";

// Variants propagate from a motion parent to its motion children, so the
// parent alone needs to observe the viewport (via whileInView) — children
// just declare their own hidden/visible states and inherit the trigger,
// instead of each one watching its own scroll position independently.
const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

function News() {
  const news = getRecentNews();

  if (news.length === 0) return null;

  return (
    <section className={styles.news}>
      <h2 className={styles.header}>NEW</h2>
      <motion.div
        className={styles.list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={listVariants}
      >
        {news.map((item) => (
          <motion.div
            key={`${item.date}-${item.title}`}
            className={styles.item}
            variants={itemVariants}
          >
            {item.image && (
              <img className={styles.image} src={item.image} alt={item.title} />
            )}
            <div className={styles.body}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              {item.href && item.cta && (
                <ButtonLink href={item.href} className={styles.cta}>
                  {item.cta}
                </ButtonLink>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default News;
