import { useLocation } from "react-router-dom";

import EmailSignupForm from "@components/email-signup-form/EmailSignupForm";
import SocialLinks from "@components/social-links/SocialLinks";

import styles from "./Footer.module.css";

function Footer() {
  const isContact = useLocation().pathname === "/contact";

  return (
    <footer className={styles.footer}>
      {!isContact && <EmailSignupForm className={styles.emailSignupForm} />}
      <SocialLinks />
      <p className={styles.copyright}>© 2026 Houses of Heaven</p>
    </footer>
  );
}

export default Footer;
