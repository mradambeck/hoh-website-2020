import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import SpotifyEmbed from "@components/spotify-embed/SpotifyEmbed";
import ButtonLink from "@components/button-link/ButtonLink";
import MusicLinksLoadingState from "@components/music-links-loading-state/MusicLinksLoadingState";

import styles from "./MusicLinks.module.css";

interface Props {
  spotifyId: string;
  appleId?: string;
  bandcampId?: string;
  image: string;
  imageAlt: string;
  className?: string;
  title: string;
}

function MusicLinks({
  spotifyId,
  appleId,
  bandcampId,
  image,
  imageAlt,
  className,
  title,
}: Props) {
  const [spotifyLoaded, setSpotifyLoaded] = useState(false);
  const buttonCount = 1 + (appleId ? 1 : 0) + (bandcampId ? 1 : 0);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {!spotifyLoaded && (
          <motion.div
            className={styles.loadingOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <MusicLinksLoadingState buttonCount={buttonCount} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: spotifyLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={
          className ? `${styles.musicLinks} ${className}` : styles.musicLinks
        }
      >
        <img src={image} alt={imageAlt} className={styles.albumArt} />
        <div className={styles.playerAndLinks}>
          <SpotifyEmbed
            id={spotifyId}
            title={title}
            onLoaded={() => setSpotifyLoaded(true)}
          />
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
      </motion.div>
    </div>
  );
}

export default MusicLinks;
