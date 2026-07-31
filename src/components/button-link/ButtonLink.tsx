import styles from "./ButtonLink.module.css";
interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
}

const ButtonLink = ({ href, children }: ButtonLinkProps) => {
  return (
    <a
      className={styles.buttonLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ButtonLink;
