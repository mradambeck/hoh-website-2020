import { afterEach, describe, expect, it, vi } from "vitest";
import worker from "./index.js";

const env = {
  GITHUB_CLIENT_ID: "test-client-id",
  GITHUB_CLIENT_SECRET: "test-client-secret",
};

function callbackRequest({ code = "abc123", state = "match-state", cookieState = "match-state" } = {}) {
  const url = new URL("https://oauth.example.com/callback");
  if (code !== null) url.searchParams.set("code", code);
  if (state !== null) url.searchParams.set("state", state);
  const headers = {};
  if (cookieState !== null) headers.Cookie = `decap_oauth_state=${cookieState}`;
  return new Request(url, { headers });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("unknown routes", () => {
  it("returns a 200 placeholder", async () => {
    const res = await worker.fetch(new Request("https://oauth.example.com/"), env);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Decap CMS OAuth provider");
  });
});

describe("GET /auth", () => {
  it("redirects to GitHub's authorize screen and sets a state cookie", async () => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue("fixed-state");

    const res = await worker.fetch(new Request("https://oauth.example.com/auth"), env);

    expect(res.status).toBe(302);
    const location = new URL(res.headers.get("Location"));
    expect(location.origin + location.pathname).toBe(
      "https://github.com/login/oauth/authorize",
    );
    expect(location.searchParams.get("client_id")).toBe("test-client-id");
    expect(location.searchParams.get("redirect_uri")).toBe(
      "https://oauth.example.com/callback",
    );
    expect(location.searchParams.get("scope")).toBe("repo,user");
    expect(location.searchParams.get("state")).toBe("fixed-state");

    const setCookie = res.headers.get("Set-Cookie");
    expect(setCookie).toContain("decap_oauth_state=fixed-state");
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Secure");
    expect(setCookie).toContain("SameSite=Lax");
  });

  it("honors a custom scope query param", async () => {
    const res = await worker.fetch(
      new Request("https://oauth.example.com/auth?scope=repo"),
      env,
    );
    const location = new URL(res.headers.get("Location"));
    expect(location.searchParams.get("scope")).toBe("repo");
  });
});

describe("GET /callback", () => {
  it("rejects when code is missing", async () => {
    const res = await worker.fetch(callbackRequest({ code: null }), env);
    const body = await res.text();
    expect(res.status).toBe(400);
    expect(body).toContain("error:");
    expect(body).toContain("Invalid or missing OAuth state");
  });

  it("rejects when state doesn't match the cookie", async () => {
    const res = await worker.fetch(
      callbackRequest({ state: "one", cookieState: "other" }),
      env,
    );
    expect(res.status).toBe(400);
    expect(await res.text()).toContain("Invalid or missing OAuth state");
  });

  it("rejects when the state cookie is missing entirely", async () => {
    const res = await worker.fetch(callbackRequest({ cookieState: null }), env);
    expect(res.status).toBe(400);
  });

  it("exchanges the code for a token and returns a success payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ access_token: "gho_test_token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const res = await worker.fetch(callbackRequest(), env);
    const body = await res.text();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://github.com/login/oauth/access_token",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          client_id: "test-client-id",
          client_secret: "test-client-secret",
          code: "abc123",
          redirect_uri: "https://oauth.example.com/callback",
        }),
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/html");
    // Clears the state cookie now that the handshake is done.
    expect(res.headers.get("Set-Cookie")).toContain("decap_oauth_state=;");
    expect(body).toContain("success:");
    expect(body).toContain("gho_test_token");
  });

  it("returns an error page when GitHub rejects the token exchange", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: "bad_verification_code",
            error_description: "The code passed is incorrect or expired.",
          }),
          { status: 200 },
        ),
      ),
    );

    const res = await worker.fetch(callbackRequest(), env);
    const body = await res.text();

    expect(res.status).toBe(400);
    expect(body).toContain("error:");
    expect(body).toContain("The code passed is incorrect or expired.");
  });

  it("returns a generic error when the token response has no access_token or error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({}), { status: 200 })),
    );

    const res = await worker.fetch(callbackRequest(), env);
    const body = await res.text();

    expect(res.status).toBe(400);
    expect(body).toContain("Token exchange failed");
  });
});
