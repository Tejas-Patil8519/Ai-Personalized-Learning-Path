import sys
from pathlib import Path

backend_directory = Path(__file__).resolve().parent / "Backend"
if str(backend_directory) not in sys.path:
    sys.path.insert(0, str(backend_directory))

from app import app

__all__ = ["app"]
