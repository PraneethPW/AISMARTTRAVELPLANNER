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
