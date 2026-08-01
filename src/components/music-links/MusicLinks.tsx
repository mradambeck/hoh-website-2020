import SpotifyEmbed from "@components/spotify-embed/SpotifyEmbed";
import ButtonLink from "@components/button-link/ButtonLink";

import styles from "./MusicLinks.module.css";

interface Props {
  spotifyId: string;
  appleId?: string;
  bandcampId?: string;
  image: string;
  imageAlt: string;
  className?: string;
}

function MusicLinks({
  spotifyId,
  appleId,
  bandcampId,
  image,
  imageAlt,
  className,
}: Props) {
  return (
    <div
      className={
        className ? `${styles.musicLinks} ${className}` : styles.musicLinks
      }
    >
      <img src={image} alt={imageAlt} className={styles.albumArt} />
      <div className={styles.playerAndLinks}>
        <SpotifyEmbed id={spotifyId} />
        <ButtonLink
          href={`https://open.spotify.com/album/${spotifyId}`}
          className={styles.button}
        >
          Listen on Spotify
        </ButtonLink>
        {appleId && (
          <ButtonLink
            href={`https://music.apple.com/us/album/${appleId}`}
            className={styles.button}
          >
            Listen on Apple Music
          </ButtonLink>
        )}

        {bandcampId && (
          <ButtonLink
            href={`https://housesofheaven.bandcamp.com/album/${bandcampId}`}
            className={styles.button}
          >
            Get it from Bandcamp
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

export default MusicLinks;
