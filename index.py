import sys
from pathlib import Path

backend_directory = Path(__file__).resolve().parent / "Backend"
sys.path.insert(0, str(backend_directory))

from app import app

frontend_directory = Path(__file__).resolve().parent / "Frontend" / "dist"
app.frontend("/", directory=str(frontend_directory), fallback="index.html")
