import sqlite3
from pathlib import Path

db_path = Path(__file__).parent / "learning_path_local.db"
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Ensure users table exists
cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
if cur.fetchone():
    # Insert or update student26@gmail.com
    cur.execute("SELECT id FROM users WHERE email='student26@gmail.com'")
    if not cur.fetchone():
        cur.execute(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            ("Student 26", "student26@gmail.com", "student12345", "student")
        )
        print("Created student26@gmail.com with student12345")
    else:
        print("student26@gmail.com already exists")

    cur.execute("SELECT id, name, email, password FROM users")
    print("All users:", cur.fetchall())

conn.commit()
conn.close()
