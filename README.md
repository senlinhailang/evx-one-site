# EVX One website

React and Vite single-page site for EVX One.

## Local development

Use Node 22, then install dependencies and start Vite:

```sh
npm ci
npm run dev
```

## Cloudflare Pages

Connect this repository to a Cloudflare Pages project and use:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js version: `22`

No framework preset is required. Vite copies `public/_redirects` and
`public/_headers` into `dist`, enabling React Router page loads and long-lived
caching for fingerprinted assets on Cloudflare Pages.

If the live threat visualization should use a custom API, add
`VITE_THREAT_ENDPOINT` as a Pages build environment variable. The value is
compiled into the browser bundle and must therefore be a public endpoint, not a
secret.

Before deploying, verify the site with:

```sh
npm run lint
npm run build
```
