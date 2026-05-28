# AISMART Travel Planner Frontend

React + TypeScript + Vite frontend for the AISMART Travel Planner dashboard.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run android:sync
npm run android:open
```

## Environment

Copy `.env.example` to `.env` and set:

```bash
VITE_API_URL=http://localhost:5000/api
```

For Vercel, use `.env.production.example` as the reference:

```bash
VITE_API_URL=https://aismarttravelplanner-production.up.railway.app/api
```

## Android Wrapper

Capacitor Android is configured in `capacitor.config.ts`.

Use this to build the web app, sync it into Android, and open Android Studio:

```bash
npm run android:open
```

The Android build uses `.env.android`, so the native app talks to the deployed Railway backend instead of local `localhost`.
