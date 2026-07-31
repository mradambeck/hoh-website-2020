import { useEffect, useRef, useState } from "react";
import splash from "../../assets/HOH-CHI.webp?w=640;960;1280;1920;2500&format=avif;webp;jpg&as=picture";
import logo from "../../assets/hoh-logo-lp2.svg";
import styles from "./Splash.module.css";

// Responsive variants generated at build time by vite-imagetools (see
// vite.config.ts) — avif/webp for supporting browsers, jpg as the
// universal <img> fallback. See src/vite-env.d.ts for the module typing
// this relies on.
function Splash() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
    if (logoRef.current?.complete) setLogoLoaded(true);
  }, []);

  return (
    <div className={styles.splash}>
      <picture>
        {Object.entries(splash.sources).map(([format, srcset]) => (
          <source key={format} type={`image/${format}`} srcSet={srcset} />
        ))}
        <img
          ref={imgRef}
          className={`${styles.splashBg} ${loaded ? styles.loaded : ""}`}
          src={splash.img.src}
          width={splash.img.w}
          height={splash.img.h}
          sizes="100vw"
          alt="Houses of Heaven"
          loading="eager"
          fetchPriority="high"
          onLoad={() => setLoaded(true)}
        />
      </picture>
      <h1 className={styles.logoHeading}>
        <img
          ref={logoRef}
          className={`${styles.splashLogo} ${logoLoaded ? styles.loaded : ""}`}
          src={logo}
          alt="Houses of Heaven"
          onLoad={() => setLogoLoaded(true)}
        />
      </h1>
    </div>
  );
}

export default Splash;
