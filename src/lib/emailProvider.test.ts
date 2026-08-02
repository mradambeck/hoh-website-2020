import { afterEach, describe, expect, it, vi } from "vitest";
import { subscribe } from "./emailProvider";

function fakeResponse({
  ok = true,
  status = 200,
  jsonBody = {},
  jsonError,
}: {
  ok?: boolean;
  status?: number;
  jsonBody?: unknown;
  jsonError?: Error;
}) {
  return {
    ok,
    status,
    json: () => (jsonError ? Promise.reject(jsonError) : Promise.resolve(jsonBody)),
  } as Response;
}

describe("subscribe", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the email to Kit's subscription endpoint", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(fakeResponse({ jsonBody: { status: "success" } }));
    vi.stubGlobal("fetch", fetchMock);

    await subscribe("fan@example.com");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://app.kit.com/forms/9754298/subscriptions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: "fan@example.com" }),
      },
    );
  });

  it("resolves without throwing on a successful signup", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(fakeResponse({ jsonBody: { status: "success" } })),
    );

    await expect(subscribe("fan@example.com")).resolves.toBeUndefined();
  });

  it("throws the API's error message when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        fakeResponse({
          ok: false,
          status: 422,
          jsonBody: { status: "error", errors: { messages: ["Email is invalid"] } },
        }),
      ),
    );

    await expect(subscribe("not-an-email")).rejects.toThrow("Email is invalid");
  });

  it("joins multiple error messages with a comma", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        fakeResponse({
          ok: false,
          status: 422,
          jsonBody: { errors: { messages: ["Email is invalid", "Already subscribed"] } },
        }),
      ),
    );

    await expect(subscribe("dup@example.com")).rejects.toThrow(
      "Email is invalid, Already subscribed",
    );
  });

  it("falls back to a generic error when the response isn't ok and has no message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(fakeResponse({ ok: false, status: 500, jsonBody: {} })),
    );

    await expect(subscribe("fan@example.com")).rejects.toThrow("Signup failed (500)");
  });

  it("throws when the response is ok but the API didn't report success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        fakeResponse({ ok: true, status: 200, jsonBody: { status: "pending" } }),
      ),
    );

    await expect(subscribe("fan@example.com")).rejects.toThrow("Signup failed (200)");
  });

  it("falls back to a generic error when the response body isn't valid JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        fakeResponse({ ok: false, status: 502, jsonError: new SyntaxError("Unexpected token") }),
      ),
    );

    await expect(subscribe("fan@example.com")).rejects.toThrow("Signup failed (502)");
  });
});
