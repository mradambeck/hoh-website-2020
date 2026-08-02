import SocialLink from "@components/social-link/SocialLink";

import igLogo from "@assets/ig-logo.svg";
import tiktokLogo from "@assets/tiktok-logo.svg";
import bandcampLogo from "@assets/bandcamp-logo.svg";
import fbLogo from "@assets/fb-logo.svg";
import spotifyLogo from "@assets/spotify-logo.svg";
import appleMusicLogo from "@assets/apple-music-logo.svg";

import styles from "./SocialLinks.module.css";

interface Props {
  className?: string;
}

const socialLinks = [
  {
    href: "https://www.instagram.com/housesofheaven",
    logo: igLogo,
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@housesofheaven",
    logo: tiktokLogo,
    label: "TikTok",
  },
  {
    href: "https://housesofheaven.bandcamp.com/music",
    logo: bandcampLogo,
    label: "Bandcamp",
  },
  {
    href: "https://www.facebook.com/housesofheaven/",
    logo: fbLogo,
    label: "Facebook",
  },
  {
    href: "https://open.spotify.com/artist/0IR8xlqcSRQShBhCebrdiv",
    logo: spotifyLogo,
    label: "Spotify",
  },
  {
    href: "https://music.apple.com/us/artist/houses-of-heaven/593279582",
    logo: appleMusicLogo,
    label: "Apple Music",
  },
];

function SocialLinks({ className }: Props) {
  return (
    <ul
      className={
        className ? `${styles.socialLinks} ${className}` : styles.socialLinks
      }
    >
      {socialLinks.map((social) => (
        <li key={social.label}>
          <SocialLink {...social} />
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
