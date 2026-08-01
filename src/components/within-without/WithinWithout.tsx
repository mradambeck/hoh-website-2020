import { useEffect, useRef, useState } from "react";

import albumArt from "@assets/within-without.jpg?w=640;960;1280;1920;2500&format=avif;webp;jpg&as=picture";

import styles from "./WithinWithout.module.css";

const WithinWithout = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <section className={styles.withinWithout}>
      <div className={styles.content}>
        <h2 className={styles.header}>Within/Without</h2>
        <div className={styles.layout}>
          <a
            href="https://housesofheaven.bandcamp.com/album/within-without"
            target="_blank"
            rel="noopener noreferrer"
          >
            <picture>
              {Object.entries(albumArt.sources).map(([format, srcset]) => (
                <source key={format} type={`image/${format}`} srcSet={srcset} />
              ))}
              <img
                ref={imgRef}
                className={`${styles.albumArt} ${loaded ? styles.loaded : ""}`}
                src={albumArt.img.src}
                width={albumArt.img.w}
                height={albumArt.img.h}
                sizes="60vw"
                alt="Within Without Album Art"
                loading="eager"
                fetchPriority="high"
                onLoad={() => setLoaded(true)}
              />
            </picture>
          </a>
          <p>
            Their sophomore LP, <em>Within/Without</em> (2024) under the Felte
            label, plunges deeper into intricate intensity, showcasing
            production by Matia Simovich (<strong>INHALT</strong>) and guest
            vocals from Douglas McCarthy (<strong>Nitzer Ebb</strong>) and
            Mariana Saldaña (<strong>BOAN</strong>, <strong>Boy Harsher</strong>
            's "Machina"). In <em>Within/Without</em>, Houses of Heaven hone a
            distinctive mix of electronic, industrial, psychedelic, and shoegaze
            elements, while grappling with themes of connection and isolation in
            a world often numbed by technology and overwhelmed by paranoia.
            Written predominantly during their time in Los Angeles, the album's
            lyrics probe themes of intimacy, desire, and visceral human touch
            amid an isolating culture of consumption. It reflects the tension of
            a dual-front war: the internal struggle and the battles we face
            within the world. This deeply personal record, more introspective
            than their debut, delves into the pull between inner dreams and the
            challenge of engaging authentically with the external world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WithinWithout;
