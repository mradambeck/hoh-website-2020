import MusicLinks from "@components/music-links/MusicLinks";
import withinWithoutArt from "@assets/within-without.jpg";
import soullessArt from "@assets/soulless.webp";
import shotInTheDarkArt from "@assets/shotinthedark.jpg";
import silentPlacesArt from "@assets/SilentPlaces.jpg";
import sleepArt from "@assets/Sleep.jpg";
import remnantArt from "@assets/remnant.jpg";
import styles from "./MusicPage.module.css";

function MusicPage() {
  return (
    <section className={styles.musicPage}>
      <h2 className={styles.header}>MUSIC</h2>
      <div className={styles.content}>
        {/* Within/Without */}
        <MusicLinks
          spotifyId="6gGEg6hBNoZbFaFmJalIB7"
          appleId="within-without/1726197746"
          bandcampId="within-without"
          image={withinWithoutArt}
          imageAlt="Within/Without album art"
          className={styles.withBorder}
        />
        {/* Soulless */}
        <MusicLinks
          spotifyId="6aK3WfXkQ04HYQFtM05uMD"
          image={soullessArt}
          imageAlt="Soulless single art"
          className={styles.withBorder}
        />
        {/* Shot in the dark */}
        <MusicLinks
          spotifyId="2FtafpNA6kIYMXf66dMaHt"
          image={shotInTheDarkArt}
          imageAlt="Shot in the Dark single art"
          className={styles.withBorder}
        />
        {/* Silent Places */}
        <MusicLinks
          spotifyId="1FTRbDGIMXCPpB3H3HWoC3"
          appleId="silent-places/1499365642"
          bandcampId="silent-places"
          image={silentPlacesArt}
          imageAlt="Silent Places album art"
          className={styles.withBorder}
        />
        {/* Sleep */}
        <MusicLinks
          spotifyId="0tgf1YP2Ad7FOv1xKRYhcS"
          appleId="sleep-inhalt-dub/1552233320?i=1552233322"
          image={sleepArt}
          imageAlt="Sleep single art"
          className={styles.withBorder}
        />
        {/* Remnant */}
        <MusicLinks
          spotifyId="0cV3jlZlfsrXYJpo8VbAuF"
          appleId="remnant-ep/1220021786"
          bandcampId="remnant"
          image={remnantArt}
          imageAlt="Remnant EP art"
          className={styles.withBorder}
        />
      </div>
    </section>
  );
}

export default MusicPage;
