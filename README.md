# Unitor Gym CRM

React + TypeScript CRM for gyms. Built with Vite, Tailwind CSS, shadcn/ui, and TanStack Query. Backend is developed separately.

## Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** (v4) for styling
- **shadcn/ui**-style components (Radix UI + CVA)
- **TanStack Query** for server state and API integration
- **React Router** v6 for routing
- **React Hook Form** + **Zod** for forms and validation

## Project structure

```
src/
├── components/       # Shared UI (e.g. components/ui)
├── features/        # Feature modules (auth, members, payments, …)
│   └── auth/        # Auth: login, register, context, hooks, services
├── layouts/         # AuthLayout, DashboardLayout
├── hooks/           # Global hooks
├── services/        # API layer (api client, interceptors)
├── types/           # Global types
├── utils/           # Helpers (storage, cn, etc.)
├── store/           # Optional global state
├── routes/          # Route config, ProtectedRoute
├── pages/           # Top-level pages (e.g. Dashboard)
└── lib/             # Utils (e.g. cn for shadcn)
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env and set your API URL:

   ```bash
   cp .env.example .env
   # Edit .env: VITE_API_URL=http://localhost:3000/api
   ```

3. Run dev server:

   ```bash
   npm run dev
   ```

4. Build:

   ```bash
   npm run build
   ```

## Auth (implemented)

- **Login** (`/login`) and **Register** (`/register`) with email + password
- Form validation via Zod + React Hook Form
- TanStack Query mutations for login/register; tokens stored and sent via API client
- Access + refresh token handling (storage, refresh on 401) in `services/api/client.ts`
- **Protected routes** for authenticated users; redirect to `/login` when not authenticated
- **Auth context** for user state and logout

## Backend contract (expected)

- `POST /auth/login` — body: `{ email, password }` → `{ user, accessToken, refreshToken, expiresIn? }`
- `POST /auth/register` — body: `{ email, password, name? }` → same as login
- `POST /auth/logout` — optional; client clears tokens anyway
- `POST /auth/refresh` — body: `{ refreshToken }` → `{ accessToken, refreshToken }`
- `GET /auth/me` — Authorization: Bearer &lt;accessToken&gt; → `user`

Adjust base URL via `VITE_API_URL` and paths in `src/services/api/client.ts` and `src/features/auth/services/authApi.ts` to match your backend.

## Next steps (not implemented)

- Members, payments, trainers, subscriptions, reports (modules can follow `features/auth` pattern)
