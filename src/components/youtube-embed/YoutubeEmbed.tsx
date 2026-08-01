import styles from "./YoutubeEmbed.module.css";

interface Props {
  id: string;
  title: string;
  className?: string;
}

const YoutubeEmbed = ({ id, title, className }: Props) => (
  <iframe
    className={
      className ? `${styles.youtubeEmbed} ${className}` : styles.youtubeEmbed
    }
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${id}?si=c31uJ-uvde9Z9EaM`}
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
);

export default YoutubeEmbed;
