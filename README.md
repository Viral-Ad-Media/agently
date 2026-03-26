# Agently Frontend

Agently is the React frontend for a receptionist SaaS. It ships a public marketing site plus an authenticated workspace where customers can onboard an AI agent, manage leads and calls, configure billing, and run test simulations.

## What It Connects To

The app is now API-driven. Workspace state comes from the backend in [`agently-server`](../agently-server), which persists data in Supabase by default and falls back to a local JSON file for offline development and tests.

Key frontend flows:

- account sign-in, registration, and secure-link verification
- onboarding with backend FAQ generation
- dashboard analytics and recent activity
- agent settings, FAQ management, and restart controls
- messenger preview backed by the server
- call log review and report downloads
- lead CRM actions and CSV export
- team, billing, and settings management
- public contact and sales forms

## Stack

- React 19
- React Router 7
- TypeScript
- Vite 6
- Recharts
- Tailwind via CDN config in [`index.html`](/Users/demola/www/Agently-/agently/index.html)

## App Structure

```text
.
├── App.tsx
├── index.tsx
├── index.css
├── types.ts
├── components/
│   └── CallSimulator.tsx
├── pages/
│   ├── Login.tsx
│   ├── Onboarding.tsx
│   ├── Dashboard.tsx
│   ├── AgentSettings.tsx
│   ├── Messenger.tsx
│   ├── CallLogs.tsx
│   ├── Leads.tsx
│   ├── Team.tsx
│   ├── Billing.tsx
│   ├── Settings.tsx
│   └── public marketing pages
└── services/
    ├── api.ts
    └── session.ts
```

## Routing

The frontend uses `HashRouter` so it can be deployed to static hosting without server-side route rewrites.

Examples:

- public home: `/#/`
- login: `/#/login`
- dashboard: `/#/dashboard`
- agent settings: `/#/agent`

## Local Setup

### 1. Install dependencies

```bash
cd agently
npm install
```

### 2. Configure the API target

Copy [.env.example](/Users/demola/www/Agently-/agently/.env.example) to `.env.local` if needed.

Available variables:

- `VITE_API_PROXY_TARGET`: backend URL used by the Vite dev proxy, defaults to `http://localhost:4000`
- `VITE_API_BASE_URL`: optional absolute API base URL for deployed environments

### 3. Start the frontend

```bash
npm run dev
```

Vite serves the app on `http://localhost:3000` by default.

## Running the Full SaaS Locally

Start the backend first:

```bash
cd agently-server
npm run start
```

Then start the frontend:

```bash
cd agently
npm run dev
```

For Supabase-backed persistence, complete the setup in [agently-server/README.md](/Users/demola/www/Agently-/agently-server/README.md).

## Auth Notes

- Password sign-in and registration go through the backend session endpoints.
- Secure-link sign-in is fully wired end-to-end.
- In local development, the backend returns a usable sign-in link immediately instead of sending email through a provider.
- A seeded dev bearer token is still available from the backend for quick API testing.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production bundle |
| `npm run lint` | Run `tsc --noEmit` |

## Deployment Notes

- Public pages can be deployed as static assets.
- The workspace expects the backend API to be reachable at the configured base URL.
- Because the app uses hash routing, static hosts do not need custom rewrite rules for frontend routes.
