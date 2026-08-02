# Houses of Heaven

Band website. Vite + React + TypeScript, deployed to GitHub Pages via
GitHub Actions, with Decap CMS for managing tour dates.

Live at [housesofheaven.com](https://housesofheaven.com).

## Stack

- **Vite + React + TypeScript** — static build, no server.
- **React Router** — `/`, `/shows`, `/music`, `/contact`.
- **Decap CMS** (`/admin`) — git-based CMS for the `shows` collection.
  Content is written to `content/shows/*.json`, which the app reads at
  build time via `import.meta.glob` (see [src/lib/shows.ts](src/lib/shows.ts)).
- **GitHub Actions** (`.github/workflows/deploy.yml`) — builds and deploys
  to GitHub Pages on every push to `main`, using `actions/deploy-pages`
  (not the `gh-pages` branch approach).
- **Cloudflare Worker** (`oauth-worker/`) — OAuth proxy for Decap's GitHub
  login. GitHub Pages can't hold a client secret, so this small Worker
  does the auth handshake instead.
- **Email signup** — client-side form posting directly to Kit (formerly
  ConvertKit)'s public "inline form" subscription endpoint (no API key —
  that endpoint is form-scoped and meant for exactly this). Provider
  logic is isolated in [src/lib/emailProvider.ts](src/lib/emailProvider.ts)
  so it can be swapped for another provider without touching the form.
  (Kit's account-wide v4 API is a separate thing that *does* need an
  auth key and isn't used here — don't confuse the two.)

## Local development

```sh
npm install
npm run dev
```

## ⚠️ Setup still required before this is fully live

### 1. Deploy the OAuth worker

Decap's admin UI (`/admin`) won't be able to log in until this is deployed
and `public/admin/config.yml`'s `base_url` points at it.

```sh
cd oauth-worker
npm install
npx wrangler login

# Create a GitHub OAuth App at https://github.com/settings/developers:
#   Homepage URL:            https://housesofheaven.com
#   Authorization callback:  https://<your-worker-subdomain>.workers.dev/callback
# (update the callback URL if you deploy to a custom domain instead)

npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npm run deploy
```

Then update `public/admin/config.yml`:

```yaml
backend:
  base_url: https://<your-worker-subdomain>.workers.dev
```

### 2. Enable GitHub Pages (Actions source)

Repo Settings → Pages → Source → **GitHub Actions**.

### 3. Point the email form at your Kit form

`src/lib/emailProvider.ts`'s `FORM_ID` needs to match an actual "inline"
form in your Kit account (Landing Pages & Forms). No API key or secret
needed — this endpoint is public and form-scoped by design.

### 4. Give Decap write access

Anyone editing shows via `/admin` needs GitHub push access to this repo
(Decap commits directly via the GitHub API using their OAuth token).

## Adding/editing shows

Either edit JSON files directly in `content/shows/`, or use `/admin` once
the OAuth worker above is deployed. Each show is one file:

```json
{
  "date": "2026-09-12",
  "venue": "Bowery Ballroom",
  "city": "New York, NY",
  "ticketUrl": "https://example.com/tickets",
  "soldOut": false
}
```

## Legacy site

The previous static HTML/CSS/JS splash page has been moved to
[legacy/](legacy/) for reference — logos and the custom font used there
now live in [src/assets/](src/assets/) and [public/](public/) for reuse.
Safe to delete once you no longer need it.
