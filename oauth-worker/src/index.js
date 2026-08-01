/**
 * Decap CMS "github" backend needs an OAuth handshake to happen somewhere
 * with a client secret, which a static GitHub Pages site can't hold. This
 * Worker is that somewhere: it redirects to GitHub's authorize screen,
 * exchanges the resulting code for a token, and hands the token back to
 * the Decap admin UI via the postMessage protocol Decap expects.
 *
 * Routes:
 *   GET /auth      - start the flow, redirect to GitHub
 *   GET /callback  - GitHub redirects here with ?code=..., we exchange it
 *
 * Required secrets (see README): GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_COOKIE = "decap_oauth_state";

function randomState() {
  return crypto.randomUUID();
}

function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function htmlMessagePage({ success, provider, token, error }) {
  const payload = success
    ? `success:${JSON.stringify({ token, provider })}`
    : `error:${JSON.stringify({ message: error })}`;

  // Decap's popup handshake: the popup announces itself as "authorizing",
  // waits for the opener to echo that back, then sends the real result.
  // This two-step exists so the opener has a chance to attach its
  // listener before the payload is sent. The opener's listener isn't
  // guaranteed to be attached yet on the first ping (React hasn't
  // necessarily rendered), so re-ping on an interval until it responds
  // instead of firing once — a one-shot ping can race and hang forever.
  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:${provider}:${payload}',
            e.origin,
          );
          window.removeEventListener('message', receiveMessage, false);
          clearInterval(pingInterval);
        }
        window.addEventListener('message', receiveMessage, false);
        var pingInterval = setInterval(function () {
          window.opener.postMessage('authorizing:${provider}', '*');
        }, 250);
      })();
    </script>
  </body>
</html>`;
}

async function handleAuth(url, env) {
  const provider = url.searchParams.get("provider") || "github";
  const scope = url.searchParams.get("scope") || "repo,user";
  const state = randomState();

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set(
    "redirect_uri",
    `${url.origin}/callback`,
  );
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      "Set-Cookie": `${STATE_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Path=/`,
    },
  });
}

async function handleCallback(request, url, env) {
  const provider = "github";
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = getCookie(request, STATE_COOKIE);

  if (!code || !state || state !== cookieState) {
    return new Response(
      htmlMessagePage({
        success: false,
        provider,
        error: "Invalid or missing OAuth state",
      }),
      { headers: { "Content-Type": "text/html" }, status: 400 },
    );
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });

  const tokenBody = await tokenRes.json();

  if (!tokenRes.ok || tokenBody.error || !tokenBody.access_token) {
    return new Response(
      htmlMessagePage({
        success: false,
        provider,
        error: tokenBody.error_description || "Token exchange failed",
      }),
      { headers: { "Content-Type": "text/html" }, status: 400 },
    );
  }

  return new Response(
    htmlMessagePage({
      success: true,
      provider,
      token: tokenBody.access_token,
    }),
    {
      headers: {
        "Content-Type": "text/html",
        "Set-Cookie": `${STATE_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/`,
      },
    },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }
    if (url.pathname === "/callback") {
      return handleCallback(request, url, env);
    }
    return new Response("Decap CMS OAuth provider", { status: 200 });
  },
};
