import styles from "./MusicLinksLoadingState.module.css";

interface Props {
  buttonCount: number;
}

function MusicLinksLoadingState({ buttonCount }: Props) {
  return (
    <div className={styles.loadingState}>
      <div className={`${styles.block} ${styles.image}`} />
      <div className={styles.column}>
        <div className={`${styles.block} ${styles.embed}`} />
        {Array.from({ length: buttonCount }).map((_, i) => (
          <div key={i} className={`${styles.block} ${styles.button}`} />
        ))}
      </div>
    </div>
  );
}

export default MusicLinksLoadingState;
