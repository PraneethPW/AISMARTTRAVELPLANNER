# AISMART Travel Planner

A professional MERN + TypeScript travel planning platform with an AI-powered dashboard, multi-page feature modules, route maps, stays, food planning, famous places, transport planning, and estimated-time views.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, Leaflet, Three.js
- Backend: Node.js, Express, TypeScript
- Database: Neon PostgreSQL
- AI: OpenRouter

## Feature Pages

- Landing page with project-specific 3D travel globe
- Dashboard analytics and quick actions
- AI planner
- Smart map
- Hotels, hostels, and PG stays
- Food planner
- Famous places
- Bus, train, and flight planning
- Estimated time planner
- Saved trips

## Environment Setup

Create local env files from the examples:

```bash
cp backend/.env.example backend/.env
cp frontend/aiplanner/.env.example frontend/aiplanner/.env
```

Add your own Neon database URL, OpenRouter key, JWT secret, app URL, OpenRouter model, and map/API URLs in the local `.env` files.

## Run Locally

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend/aiplanner
npm install
npm run dev
```

The frontend defaults to `http://localhost:5000/api` for API calls.

## Deployment URLs

- Backend: `https://aismarttravelplanner-production.up.railway.app`
- Frontend: `https://aismartplanner.vercel.app`

## Railway Backend Variables

Set these as separate Railway variables. Do not paste the whole `.env` file into one variable.

```bash
APP_URL=https://aismartplanner.vercel.app
CORS_ORIGINS=https://aismartplanner.vercel.app,http://localhost:5173,http://127.0.0.1:5173
DATABASE_URL=your_neon_database_url
DB_SSL_REJECT_UNAUTHORIZED=false
DB_AUTO_MIGRATE=true
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-4o-mini
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
```

## Vercel Frontend Variables

```bash
VITE_API_URL=https://aismarttravelplanner-production.up.railway.app/api
VITE_LEAFLET_MARKER_ICON_URL=https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png
VITE_LEAFLET_MARKER_ICON_RETINA_URL=https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png
VITE_LEAFLET_MARKER_SHADOW_URL=https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

The frontend also has a production fallback to the Railway API URL, and the backend allows both localhost and the deployed Vercel origin through CORS.
