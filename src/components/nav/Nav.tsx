import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useIsMobile } from "@hooks/useIsMobile";
import logo from "../../assets/hoh-logo-lp2.svg";
import styles from "./Nav.module.css";

const barTransition = { duration: 0.25, ease: "easeInOut" as const };
const linksTransition = { duration: 0.2, ease: "easeInOut" as const };

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const isHome = useLocation().pathname === "/";
  const isMobile = useIsMobile();

  // The links row is the permanent desktop nav outside of mobile — only
  // gate it on isOpen (and animate it) once we're actually in the mobile
  // layout, otherwise it must always be shown/mounted.
  const showLinks = !isMobile || isOpen;

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <h1 className={styles.logoHeading}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            <img
              src={logo}
              alt="Houses of Heaven"
              className={`${styles.logo} ${!isHome ? styles.logoVisible : ""}`}
            />
          </NavLink>
        </h1>
        <button
          type="button"
          className={styles.toggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="nav-links"
          onClick={() => setIsOpen((open) => !open)}
        >
          <motion.span
            className={styles.bar}
            style={{ x: "-50%" }}
            animate={{ y: isOpen ? "0rem" : "-0.6rem", rotate: isOpen ? 45 : 0 }}
            transition={barTransition}
          />
          <motion.span
            className={styles.bar}
            style={{ x: "-50%" }}
            animate={{ y: isOpen ? "0rem" : "0.6rem", rotate: isOpen ? -45 : 0 }}
            transition={barTransition}
          />
        </button>
      </div>
      <AnimatePresence>
        {showLinks && (
          <motion.ul
            id="nav-links"
            className={styles.links}
            initial={isMobile ? { opacity: 0, y: "-0.8rem" } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-0.8rem" }}
            transition={linksTransition}
          >
            <li>
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/live" onClick={() => setIsOpen(false)}>
                Live
              </NavLink>
            </li>
            <li>
              <NavLink to="/music" onClick={() => setIsOpen(false)}>
                Music
              </NavLink>
            </li>
            <li>
              <NavLink to="/video" onClick={() => setIsOpen(false)}>
                Video
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
            </li>
            <li>
              <a
                href="https://housesofheaven.bandcamp.com/merch"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;
