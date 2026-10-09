import sys
from pathlib import Path

# Ensure Backend directory is in the import search path
root_dir = Path(__file__).resolve().parent.parent
backend_dir = root_dir / "Backend"

if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from app import app
