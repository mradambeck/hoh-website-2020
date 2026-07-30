/**
 * Thin wrapper around whichever email provider is doing list management.
 * To swap providers, write a new `subscribe` function matching this
 * signature and change the export at the bottom — the form component
 * doesn't need to know which provider is behind it.
 */
export type SubscribeFn = (email: string) => Promise<void>;

const CONVERTKIT_FORM_ID = import.meta.env.VITE_CONVERTKIT_FORM_ID as
  | string
  | undefined;
const CONVERTKIT_API_KEY = import.meta.env.VITE_CONVERTKIT_API_KEY as
  | string
  | undefined;

// ConvertKit (Kit)'s v3 form-subscribe endpoint is designed to be called
// directly from the browser with the public "API Key" (not the secret),
// so no proxy/backend is needed. Docs: https://developers.convertkit.com/
const subscribeConvertKit: SubscribeFn = async (email) => {
  if (!CONVERTKIT_FORM_ID || !CONVERTKIT_API_KEY) {
    throw new Error(
      "Missing VITE_CONVERTKIT_FORM_ID / VITE_CONVERTKIT_API_KEY env vars",
    );
  }

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
    },
  );

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Signup failed (${res.status})`);
  }
};

export const subscribe: SubscribeFn = subscribeConvertKit;
