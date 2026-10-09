# Backend Setup

1. Install Python 3.10+ and MySQL.
2. Create the database:
   - Open MySQL Workbench.
   - Open `schema.sql`.
   - Run the complete script.
3. Copy `.env.example` to `.env`.
4. Set MYSQL_PASSWORD and GOOGLE_API_KEY.
5. Run `start.bat`.
6. Backend API: http://localhost:8000
7. API docs: http://localhost:8000/docs

The project includes a simple RAG module in `rag.py` and sample knowledge files.
The Gemini integration is in `app.py`. If the API key is missing, a safe demo
fallback path is returned so the frontend can still be tested.
