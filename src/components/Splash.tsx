import splash from "../assets/HOH-CHI.webp?w=640;960;1280;1920;2500&format=avif;webp;jpg&as=picture";
import logo from "../assets/hoh-logo-lp2.svg";

// Responsive variants generated at build time by vite-imagetools (see
// vite.config.ts) — avif/webp for supporting browsers, jpg as the
// universal <img> fallback. See src/vite-env.d.ts for the module typing
// this relies on.
function Splash() {
  return (
    <div className="splash">
      <picture>
        {Object.entries(splash.sources).map(([format, srcset]) => (
          <source key={format} type={`image/${format}`} srcSet={srcset} />
        ))}
        <img
          className="splash-bg"
          src={splash.img.src}
          width={splash.img.w}
          height={splash.img.h}
          sizes="100vw"
          alt="Houses of Heaven"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      <img className="splash-logo" src={logo} alt="Houses of Heaven" />
    </div>
  );
}

export default Splash;
