import { describe, expect, it, vi } from "vitest";
import type { Connect } from "vite";
import { rewriteAdminIndexMiddleware } from "./admin-rewrite-middleware";

function run(url: string) {
  const req = { url } as Connect.IncomingMessage;
  const res = {} as Parameters<Connect.NextHandleFunction>[1];
  const next = vi.fn();
  rewriteAdminIndexMiddleware(req, res, next);
  return { req, next };
}

describe("rewriteAdminIndexMiddleware", () => {
  it.each(["/admin", "/admin/"])("rewrites %s to /admin/index.html", (url) => {
    const { req, next } = run(url);
    expect(req.url).toBe("/admin/index.html");
    expect(next).toHaveBeenCalledOnce();
  });

  it.each(["/admin/config.yml", "/admin/index.html", "/", "/other"])(
    "leaves %s untouched",
    (url) => {
      const { req, next } = run(url);
      expect(req.url).toBe(url);
      expect(next).toHaveBeenCalledOnce();
    },
  );
});
