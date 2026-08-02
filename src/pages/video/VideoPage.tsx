import YoutubeEmbed from "@components/youtube-embed/YoutubeEmbed";

import styles from "./VideoPage.module.css";

function VideoPage() {
  return (
    <section className={styles.video}>
      <div className={styles.pageWrapper}>
        <h2 className={styles.header}>VIDEO</h2>
        <YoutubeEmbed
          id="asq1oe2I4Lo"
          title="Houses of Heaven, 'Deserve' feat. Ms. Boan"
        />
        <YoutubeEmbed
          id="Rm8ClC7hCqE"
          title="Houses of Heaven, 'Strange Temptation (Official Visualizer)'"
        />
        <YoutubeEmbed
          id="S9wtbMBuiYI"
          title="Ghost Cop, 'A Shot in the Dark (Houses of Heaven Remix)'"
        />
        <YoutubeEmbed
          id="cdMnzvD0VpM"
          title="Houses of Heaven, 'Dissolve the Floor'"
        />
      </div>
    </section>
  );
}

export default VideoPage;
