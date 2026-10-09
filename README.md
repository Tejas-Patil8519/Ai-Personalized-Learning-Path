# AI Personalized Learning Path

An AI-assisted learning-path planner with a React/Vite frontend and FastAPI backend.

## Local Development & Setup

### 1. MySQL Database
MySQL 8.0 is installed and configured:
- **Host**: `localhost`
- **Port**: `3306`
- **User**: `root`
- **Password**: *(empty)*
- **Database**: `learning_path_db`
- **Data directory**: `D:\mysql_data`

The database is pre-populated using `Backend/schema.sql`.

Demo accounts:
- Email: `student@example.com` / Password: `student123`
- Email: `student26@gmail.com` / Password: `student12345`

### 2. Start Everything
Simply double-click or run:
```bat
start.bat
```
This launcher will:
1. Ensure the MySQL Server process is running on port 3306.
2. Start the FastAPI backend at `http://localhost:8000` (Swagger docs at `http://localhost:8000/docs`).
3. Start the Vite React frontend at `http://localhost:5173`.
4. Open your default web browser automatically.

---

## Deploy to Vercel

### Architecture
- **Frontend**: Built via `npm run build --prefix Frontend` to `Frontend/dist`.
- **Backend API**: Exposed as a Vercel Serverless Function via `api/index.py`.
- **Routing**: `vercel.json` rewrites `/api/*` to `api/index.py` and all client-side routes to `/index.html`.

### Vercel Environment Variables (Project Settings -> Environment Variables)
For persistent production data, connect any remote MySQL database (e.g. TiDB Cloud, Aiven, PlanetScale, Railway, Supabase):
- `MYSQL_HOST`
- `MYSQL_PORT` (e.g. `3306`)
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE` (`learning_path_db`)
- `GOOGLE_API_KEY` (Gemini API key; without it, grounded fallback path generator is used)
- `GEMINI_MODEL` (e.g. `gemini-2.0-flash`)

*Note: If MySQL credentials are not configured on Vercel, the API automatically falls back to an in-memory/temp SQLite database (`/tmp/learning_path_local.db`) seeded with all demo accounts and courses so the deployed application continues to function without crashing.*
