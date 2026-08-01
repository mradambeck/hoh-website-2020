import { getRecentNews } from "@lib/news";
import ButtonLink from "@components/button-link/ButtonLink";
import styles from "./News.module.css";

function News() {
  const news = getRecentNews();

  if (news.length === 0) return null;

  return (
    <section className={styles.news}>
      <h2 className={styles.header}>NEW</h2>
      <div className={styles.list}>
        {news.map((item) => (
          <div key={`${item.date}-${item.title}`} className={styles.item}>
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default News;
