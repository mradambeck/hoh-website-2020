/// <reference types="vite/client" />

// vite-imagetools doesn't ship ambient module types for transformed image
// imports, so declare the output shape ourselves. Matches any import whose
// query string ends in `as=picture` — keep that directive last when adding
// new imagetools imports so it stays covered by this declaration.
declare module "*&as=picture" {
  import type { Picture } from "vite-imagetools";
  const out: Picture;
  export default out;
}
