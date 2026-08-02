import styles from "./SpotifyEmbed.module.css";

interface Props {
  className?: string;
  id: string;
  onLoaded?: () => void;
}

const SpotifyEmbed = ({ className, id, onLoaded = () => null }: Props) => (
  <iframe
    className={
      className ? `${styles.spotifyEmbed} ${className}` : styles.spotifyEmbed
    }
    data-testid="embed-iframe"
    style={{ borderRadius: "12px" }}
    src={`https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0&si=745db058556546f2`}
    width="100%"
    height="152"
    frameBorder="0"
    allowFullScreen
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    onLoad={onLoaded}
  ></iframe>
);

export default SpotifyEmbed;
