import sys
from pathlib import Path

# Ensure api directory is first in the import path
api_dir = Path(__file__).resolve().parent
root_dir = api_dir.parent
backend_dir = root_dir / "Backend"

for p in [str(api_dir), str(backend_dir), str(root_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from app import app

# Expose app for Vercel ASGI
__all__ = ["app"]
