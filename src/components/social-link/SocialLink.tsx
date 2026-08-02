import styles from "./SocialLink.module.css";

interface Props {
  href: string;
  logo: string;
  label: string;
}

function SocialLink({ href, logo, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={styles.socialLink}
    >
      <img src={logo} alt="" className={styles.logo} />
    </a>
  );
}

export default SocialLink;
