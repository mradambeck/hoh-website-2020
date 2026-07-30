import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

// Custom domain (see public/CNAME) serves the site from the root,
// so no base path is needed. If you ever drop the custom domain and
// serve from https://<user>.github.io/<repo>/, set base: "/<repo>/".
export default defineConfig({
  plugins: [react(), imagetools()],
});
