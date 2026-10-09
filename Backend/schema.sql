-- =======================================================
-- AI Personalized Learning Path - MySQL Workbench Schema
-- Database initialization and tables
-- =======================================================

CREATE DATABASE IF NOT EXISTS learning_path_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE learning_path_db;

-- 1. Users Table (Authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Students Profile & AI Skills Assessment Table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  name VARCHAR(100) NOT NULL,
  age INT DEFAULT 20,
  education VARCHAR(150) DEFAULT 'Undergraduate',
  level VARCHAR(50) DEFAULT 'Beginner',
  skills TEXT,
  interests TEXT,
  strengths TEXT,
  weaknesses TEXT,
  hobbies TEXT,
  goals TEXT,
  weekly_hours INT DEFAULT 10,
  preferred_style VARCHAR(50) DEFAULT 'Hands-on Projects & Videos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Courses Catalog Table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(100) DEFAULT 'Computer Science',
  description TEXT,
  level VARCHAR(50) DEFAULT 'Beginner',
  duration VARCHAR(50) DEFAULT '4 weeks',
  lessons_count INT DEFAULT 12,
  instructor VARCHAR(100) DEFAULT 'LearnAI Faculty',
  thumbnail_icon VARCHAR(50) DEFAULT '📘'
);

-- 4. Video Lectures Table
CREATE TABLE IF NOT EXISTS video_lectures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NULL,
  title VARCHAR(200) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  duration VARCHAR(50) DEFAULT '15 mins',
  video_url VARCHAR(300) NOT NULL,
  youtube_id VARCHAR(50) DEFAULT 'rfscVS0vtbw',
  description TEXT,
  instructor VARCHAR(100) DEFAULT 'AI Expert',
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- 5. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_option VARCHAR(10) NOT NULL,
  explanation TEXT
);

-- 6. Quiz Attempts / Performance Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NULL,
  user_email VARCHAR(150) DEFAULT 'student@example.com',
  topic VARCHAR(100) DEFAULT 'General AI & Coding',
  score INT NOT NULL,
  total_questions INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. AI Personalized Learning Paths Table
CREATE TABLE IF NOT EXISTS learning_paths (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NULL,
  user_email VARCHAR(150) DEFAULT 'student@example.com',
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  target_role VARCHAR(150),
  rag_sources TEXT,
  estimated_weeks INT DEFAULT 12,
  steps_json LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Student Progress & Metrics Table
CREATE TABLE IF NOT EXISTS student_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NULL,
  user_email VARCHAR(150) NOT NULL,
  completed_lectures INT DEFAULT 3,
  total_lectures INT DEFAULT 15,
  completed_quizzes INT DEFAULT 2,
  average_quiz_score DECIMAL(5,2) DEFAULT 85.00,
  streak_days INT DEFAULT 5,
  study_hours DECIMAL(5,1) DEFAULT 14.5,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =======================================================
-- Seed Initial Demo Data
-- =======================================================

-- Demo User
INSERT IGNORE INTO users (id, name, email, password, role) VALUES
(1, 'Demo Student', 'student@example.com', 'student123', 'student');

-- Demo Student Profile
INSERT IGNORE INTO students (id, user_id, name, age, education, level, skills, interests, strengths, weaknesses, hobbies, goals, weekly_hours, preferred_style) VALUES
(1, 1, 'Demo Student', 21, 'B.Tech / Computer Science', 'Beginner', 'Python, Basic HTML, Logic Building', 'Artificial Intelligence, Web Dev, Machine Learning', 'Logical thinking, Problem solving, Fast learner', 'Time management, Consistency with complex math', 'Chess, Gaming, Tech blogging', 'Become a certified Full-Stack AI Engineer', 12, 'Interactive Projects & Video Lectures');

-- Courses
INSERT INTO courses (id, title, category, description, level, duration, lessons_count, instructor, thumbnail_icon) VALUES
(1, 'Python Fundamentals for AI', 'Programming', 'Master core Python, data structures, and algorithmic foundations necessary for modern AI development.', 'Beginner', '4 weeks', 16, 'Dr. Sarah Lin', '🐍'),
(2, 'Machine Learning & Deep Neural Nets', 'Artificial Intelligence', 'From linear regression to deep neural architectures, loss optimization, and evaluation metrics.', 'Intermediate', '6 weeks', 24, 'Prof. Alex Mercer', '🧠'),
(3, 'Modern Full-Stack Web Development', 'Web Development', 'Build responsive client applications with React and scale server backends with FastAPI and REST APIs.', 'Beginner', '5 weeks', 20, 'Devon Vance', '⚡'),
(4, 'RAG & Generative AI Applications', 'Applied AI', 'Implement Retrieval Augmented Generation, vector indexing, Google Gemini APIs, and prompt workflows.', 'Advanced', '4 weeks', 14, 'Elena Rostova', '🔮'),
(5, 'Data Science & Visual Analytics', 'Data Science', 'Pandas, NumPy, data wrangling, exploratory data analysis, and publication-ready storytelling visualizations.', 'Beginner', '4 weeks', 18, 'Carlos Mendes', '📊')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Video Lectures
INSERT INTO video_lectures (id, course_id, title, topic, duration, video_url, youtube_id, description, instructor) VALUES
(1, 1, 'Python in 100 Seconds & Core Syntax', 'Python', '12 mins', 'https://www.youtube.com/watch?v=x7X9w_GIm1s', 'x7X9w_GIm1s', 'Quick overview of Python programming language, data types, and syntax rules.', 'Fireship'),
(2, 1, 'Python Full Course for Beginners', 'Python', '45 mins', 'https://www.youtube.com/watch?v=eWRfhZUzrAc', 'eWRfhZUzrAc', 'Hands-on beginner tutorial covering variables, loops, conditionals, functions, and data structures.', 'freeCodeCamp'),
(3, 2, 'Machine Learning Basics in 15 Minutes', 'Machine Learning', '15 mins', 'https://www.youtube.com/watch?v=ukzFI9RGwfU', 'ukzFI9RGwfU', 'Understand supervised vs unsupervised learning, features, labels, and training pipelines.', 'Simplilearn'),
(4, 2, 'Neural Networks & Deep Learning Explained', 'Deep Learning', '20 mins', 'https://www.youtube.com/watch?v=aircAruvnKk', 'aircAruvnKk', 'Visual intuitive guide to neurons, weights, biases, and backpropagation.', '3Blue1Brown'),
(5, 4, 'What is RAG? (Retrieval-Augmented Generation)', 'Generative AI', '14 mins', 'https://www.youtube.com/watch?v=T-D1OfcDW1M', 'T-D1OfcDW1M', 'Why foundation LLMs hallucinate and how RAG grounds models with real-time documentation and vector search.', 'IBM Technology'),
(6, 3, 'React & Modern Frontend Architecture', 'Web Development', '30 mins', 'https://www.youtube.com/watch?v=bMknfKXIFA8', 'bMknfKXIFA8', 'State, hooks, component reusability, and connecting React frontends to REST APIs.', 'freeCodeCamp')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Quiz Questions
INSERT INTO quiz_questions (id, topic, question, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(1, 'AI & Machine Learning', 'What distinguishes supervised learning from unsupervised learning?', 'Supervised learning uses labeled training data', 'Supervised learning does not need data', 'Unsupervised learning always produces higher accuracy', 'Supervised learning only runs on GPUs', 'A', 'Supervised learning maps inputs to known output labels provided during training.'),
(2, 'Generative AI & RAG', 'What does RAG stand for in modern AI systems?', 'Recursive Artificial Graph', 'Retrieval-Augmented Generation', 'Rapid Adaptive Gradient', 'Realtime Agent Generation', 'B', 'RAG stands for Retrieval-Augmented Generation, combining information retrieval with generative LLMs.'),
(3, 'Python & Programming', 'Which Python collection type is immutable?', 'List', 'Dictionary', 'Set', 'Tuple', 'D', 'Tuples are ordered and immutable collections in Python.'),
(4, 'Web Architecture', 'Which HTTP status code signifies that a requested resource was created successfully?', '200 OK', '201 Created', '204 No Content', '304 Not Modified', 'B', 'HTTP 201 Created indicates that the request succeeded and led to the creation of a resource.'),
(5, 'Data Science', 'Which Python library is primary for structured tabular data manipulation?', 'NumPy', 'Matplotlib', 'Pandas', 'Requests', 'C', 'Pandas provides DataFrames and Series optimized for tabular data manipulation.')
ON DUPLICATE KEY UPDATE question=VALUES(question);
