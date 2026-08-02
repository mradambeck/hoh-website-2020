/**
 * Thin wrapper around whichever email provider is doing list management.
 * To swap providers, write a new `subscribe` function matching this
 * signature and change the export at the bottom — the form component
 * doesn't need to know which provider is behind it.
 */
export type SubscribeFn = (email: string) => Promise<void>;

// Kit (formerly ConvertKit)'s "inline" embed forms have their own public,
// form-scoped subscription endpoint that's safe to call directly from
// the browser — no API key involved. This is distinct from (and much
// simpler than) Kit's account-wide v4 API, which does require an
// account-scoped key and isn't meant for client-side use.
const FORM_ID = "9754298";
const SUBSCRIBE_URL = `https://app.kit.com/forms/${FORM_ID}/subscriptions`;

const subscribeConvertKit: SubscribeFn = async (email) => {
  const res = await fetch(SUBSCRIBE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email_address: email }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok || body?.status !== "success") {
    throw new Error(
      body?.errors?.messages?.join(", ") ?? `Signup failed (${res.status})`,
    );
  }
};

export const subscribe: SubscribeFn = subscribeConvertKit;
