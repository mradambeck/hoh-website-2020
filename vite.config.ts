import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import { rewriteAdminIndexMiddleware } from "./admin-rewrite-middleware.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function rewriteAdminIndex(): Plugin {
  return {
    name: "rewrite-admin-index",
    configureServer(server) {
      server.middlewares.use(rewriteAdminIndexMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteAdminIndexMiddleware);
    },
  };
}

// Custom domain (see public/CNAME) serves the site from the root,
// so no base path is needed. If you ever drop the custom domain and
// serve from https://<user>.github.io/<repo>/, set base: "/<repo>/".
export default defineConfig({
  plugins: [react(), imagetools(), rewriteAdminIndex()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@types": path.resolve(__dirname, "src/types"),
      "@types/*": path.resolve(__dirname, "src/types/*"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts?(x)", "*.test.ts"],
  },
});
