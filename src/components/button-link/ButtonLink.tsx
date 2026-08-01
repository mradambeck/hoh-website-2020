import styles from "./ButtonLink.module.css";
interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonLink = ({ href, children, className }: ButtonLinkProps) => {
  return (
    <a
      className={`${styles.buttonLink} ${className ?? ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ButtonLink;
