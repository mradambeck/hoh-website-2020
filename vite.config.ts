import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom domain (see public/CNAME) serves the site from the root,
// so no base path is needed. If you ever drop the custom domain and
// serve from https://<user>.github.io/<repo>/, set base: "/<repo>/".
export default defineConfig({
  plugins: [react(), imagetools()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@types": path.resolve(__dirname, "src/types"),
      "@types/*": path.resolve(__dirname, "src/types/*"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
