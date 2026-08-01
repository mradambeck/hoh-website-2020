import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Connect, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Neither /admin nor /admin/ has an exact file match, so both vite dev
// and vite preview fall through to the SPA's own index.html instead of
// public/admin/index.html — preview at least does directory-index
// resolution for a trailing slash, dev doesn't do that at all. Rewrite
// the request to the real file path before any other middleware (in
// particular vite dev's index.html transform, which only touches the
// project-root index.html, not this one) sees it.
function rewriteAdminIndex(): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url === "/admin" || req.url === "/admin/") {
      req.url = "/admin/index.html";
    }
    next();
  };
  return {
    name: "rewrite-admin-index",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
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
      "@lib": path.resolve(__dirname, "src/lib"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@types": path.resolve(__dirname, "src/types"),
      "@types/*": path.resolve(__dirname, "src/types/*"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
