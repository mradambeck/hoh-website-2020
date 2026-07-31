import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/hoh-logo-lp2.svg";
import styles from "./Nav.module.css";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <h1 className={styles.logoHeading}>
          <img src={logo} alt="Houses of Heaven" className={styles.logo} />
        </h1>
        <button
          type="button"
          className={`${styles.toggle} ${isOpen ? styles.open : ""}`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="nav-links"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>
      <ul
        id="nav-links"
        className={`${styles.links} ${isOpen ? styles.open : ""}`}
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
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
