import { useEffect, useState } from "react";

// Matches the 774px breakpoint used throughout the CSS. Needed wherever
// an animation's mobile-only behavior can't be left to a media query
// alone (e.g. driving it from React state).
export function useIsMobile(breakpoint = 774) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}
