import type { Connect } from "vite";

// Neither /admin nor /admin/ has an exact file match, so both vite dev
// and vite preview fall through to the SPA's own index.html instead of
// public/admin/index.html — preview at least does directory-index
// resolution for a trailing slash, dev doesn't do that at all. Rewrite
// the request to the real file path before any other middleware (in
// particular vite dev's index.html transform, which only touches the
// project-root index.html, not this one) sees it.
export const rewriteAdminIndexMiddleware: Connect.NextHandleFunction = (req, res, next) => {
  if (req.url === "/admin" || req.url === "/admin/") {
    req.url = "/admin/index.html";
  }
  next();
};
