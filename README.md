# AI Personalized Learning Path

An AI-assisted learning-path planner with a React/Vite frontend and FastAPI backend.

## Local development

1. Install the backend dependencies from `Backend/requirements.txt`.
2. Copy `Backend/.env.example` to `Backend/.env` and set database and Gemini
   credentials as needed. The backend uses a local SQLite database when MySQL
   is unavailable.
3. Start the backend from `Backend` with `uvicorn app:app --reload`.
4. In another terminal, run `npm ci` and `npm run dev` from `Frontend`.

The Vite development server proxies `/api` requests to `http://127.0.0.1:8000`.
Set `VITE_API_URL` only when the API is hosted at a different origin.

## Deploy the full app to Vercel

Import the repository with the **repository root** as the Vercel project root.
The root `vercel.json` builds the Vite app, and `index.py` exposes the FastAPI
application. The API serves the generated frontend and its SPA fallback from the
same origin, so `VITE_API_URL` can remain unset.

Vercel's filesystem is not durable. Configure a managed MySQL database before
using the deployed app; the Vercel backend deliberately does not fall back to
SQLite. Name the database `learning_path_db` to match `Backend/schema.sql`, then
execute that schema against it. Add these environment variables in Vercel for
each environment you deploy:

- `MYSQL_HOST`
- `MYSQL_PORT` (usually `3306`)
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE` (set to `learning_path_db`)
- `GOOGLE_API_KEY` (optional; without it, the backend uses its grounded fallback
  learning-path generator)
- `GEMINI_MODEL` (optional; defaults to `gemini-2.0-flash`)

Set `FRONTEND_URL` only if you also need to allow a separate browser origin; the
same-origin Vercel deployment does not require CORS configuration. Keep
credentials in Vercel environment variables, never in source files.
