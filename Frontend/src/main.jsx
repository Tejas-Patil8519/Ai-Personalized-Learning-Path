import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import {
  LayoutDashboard,
  UserRound,
  BookOpen,
  Video,
  ClipboardCheck,
  BarChart3,
  TrendingUp,
  Route,
  Settings,
  LogOut,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  Play,
  Key,
  Check,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  FileText,
  BrainCircuit,
  Database,
  Code2,
  Sliders,
  Layers
} from "lucide-react";
import "./styles.css";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Configure axios default headers
axios.interceptors.request.use((config) => {
  const customKey = localStorage.getItem("custom_gemini_key");
  if (customKey) {
    config.headers["X-Gemini-Key"] = customKey;
  }
  return config;
});

// ==========================================
// 1. AUTHENTICATION (LOGIN & REGISTER)
// ==========================================
function AuthPage({ onLoginSuccess }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("student123");
  const [name, setName] = useState("Demo Student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPassword = password.trim();
    try {
      if (tab === "login") {
        const res = await axios.post(`${API_BASE}/api/auth/login`, { email: cleanedEmail, password: cleanedPassword });
        localStorage.setItem("learnai_token", res.data.token);
        localStorage.setItem("learnai_user", JSON.stringify(res.data.user));
        onLoginSuccess(res.data.user);
      } else {
        const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email: cleanedEmail, password: cleanedPassword });
        localStorage.setItem("learnai_token", res.data.token);
        localStorage.setItem("learnai_user", JSON.stringify(res.data.user));
        onLoginSuccess(res.data.user);
      }
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
        return;
      }

      setError("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("student@example.com");
    setPassword("student123");
    setName("Demo Student");
    setError("");
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Sparkles size={28} />
          </div>
          <h2>AI Learning Path</h2>
          <p>Personalized AI-powered curriculum and career roadmaps</p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            Student Login
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => setTab("register")}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {tab === "register" && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "10px", borderRadius: "8px", fontSize: "13px" }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }} disabled={loading}>
            {loading ? <RefreshCw className="spin" size={18} /> : (tab === "login" ? "Sign In to Portal" : "Create Student Account")}
          </button>
        </form>

        <div className="demo-account-box">
          <div>
            <div style={{ fontWeight: 600, color: "#fff" }}>Demo Credentials</div>
            <div style={{ color: "var(--text-muted)" }}>student@example.com / student123</div>
          </div>
          <button type="button" className="btn-outline" onClick={handleFillDemo} style={{ padding: "4px 10px", fontSize: "11px" }}>
            Auto-fill
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. DASHBOARD VIEW
// ==========================================
function DashboardView({ onNavigate, studentProfile, learningPath, progressData }) {
  return (
    <div>
      <div className="hero-banner">
        <div>
          <div className="hero-tag">
            <BrainCircuit size={14} /> AI-Powered Personalized Learning
          </div>
          <h2>Welcome back, {studentProfile?.name || "Student"}! 👋</h2>
          <p>
            Your AI roadmap is tailored to your target goal: <strong>{studentProfile?.goals || "Master Modern AI & Full-Stack Development"}</strong>.
            Review your weekly progress, complete video lectures, and test skills with interactive quizzes.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onNavigate("assessment")}>
              <Sparkles size={16} /> Update Skills & AI Path
            </button>
            <button className="btn-secondary" onClick={() => onNavigate("videos")}>
              <Play size={16} /> Continue Lectures
            </button>
          </div>
        </div>
        <div className="hero-graphic">
          <BrainCircuit size={110} color="#a5b4fc" />
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#6366f1" }}>
            <Award size={24} />
          </div>
          <div>
            <div className="stat-label">Overall Mastery</div>
            <div className="stat-value">84%</div>
            <div className="stat-detail text-success">↑ Top 10% in cohort</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-label">Weekly Study Hours</div>
            <div className="stat-value">{progressData?.hours_completed_this_week || 8.5}h</div>
            <div className="stat-detail text-secondary">Target: {studentProfile?.weekly_hours || 10}h/wk</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
            <ClipboardCheck size={24} />
          </div>
          <div>
            <div className="stat-label">Quiz Score Avg</div>
            <div className="stat-value">82.5%</div>
            <div className="stat-detail text-success">Passed 4 assessments</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-label">Learning Streak</div>
            <div className="stat-value">{progressData?.streak_days || 7} Days</div>
            <div className="stat-detail text-warning">🔥 Consistency on point</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-columns">
        <div className="card">
          <h3 className="card-title">Quick Actions</h3>
          <p className="card-subtitle">Direct shortcuts to essential learning modules</p>
          <div className="action-buttons-grid">
            <button className="action-card-btn" onClick={() => onNavigate("assessment")}>
              <div className="action-icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#6366f1" }}>🎯</div>
              <strong>Student Assessment</strong>
              <span>Update skills, strengths & hobbies</span>
            </button>
            <button className="action-card-btn" onClick={() => onNavigate("path")}>
              <div className="action-icon" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>🗺️</div>
              <strong>AI Learning Path</strong>
              <span>View RAG roadmap & phases</span>
            </button>
            <button className="action-card-btn" onClick={() => onNavigate("videos")}>
              <div className="action-icon" style={{ background: "rgba(236, 72, 153, 0.15)", color: "#ec4899" }}>🎥</div>
              <strong>Video Lectures</strong>
              <span>Watch curated video courses</span>
            </button>
            <button className="action-card-btn" onClick={() => onNavigate("quiz")}>
              <div className="action-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>📝</div>
              <strong>Skill Quizzes</strong>
              <span>Test and benchmark concepts</span>
            </button>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 className="card-title">Active AI Learning Path</h3>
              <p className="card-subtitle" style={{ margin: 0 }}>Grounding: RAG Curriculum Engine</p>
            </div>
            <span className="rag-pill">RAG Grounded</span>
          </div>

          {learningPath ? (
            <div>
              <h4 style={{ fontSize: "16px", color: "#fff", marginBottom: "8px" }}>{learningPath.title}</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
                {learningPath.summary}
              </p>
              <div style={{ background: "rgba(0, 0, 0, 0.2)", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target Predicted Role:</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--secondary)" }}>{learningPath.target_role || "AI Engineer"}</div>
              </div>
              <button className="btn-primary" onClick={() => onNavigate("path")}>
                Explore Full {learningPath.steps?.length || 5}-Step Roadmap <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <Sparkles size={36} color="#6366f1" style={{ marginBottom: "12px" }} />
              <h4>No AI Path Generated Yet</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "8px 0 16px" }}>
                Complete your student assessment with your skills, interests, and strengths.
              </p>
              <button className="btn-primary" onClick={() => onNavigate("assessment")}>
                Generate AI Path Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. STUDENT ASSESSMENT & SKILLS FORM (POINT 3 OF PROMPT)
// ==========================================
function StudentAssessmentForm({ profile, onSaveAndGenerate }) {
  const [formData, setFormData] = useState(
    profile || {
      name: "Demo Student",
      age: 21,
      education: "Undergraduate (B.Tech Computer Science)",
      level: "Beginner",
      skills: "Python basics, HTML/CSS, Basic logic",
      interests: "Artificial Intelligence, Machine Learning, Web Applications",
      strengths: "Quick problem solving, High curiosity, Analytical reasoning",
      weaknesses: "Time management, Math anxiety with linear algebra, Staying consistent",
      hobbies: "Chess, Gaming, Tech blogging",
      goals: "Build intelligent full-stack AI apps and land an AI Engineer role",
      weekly_hours: 12,
      preferred_style: "Interactive Projects & Video Lectures"
    }
  );

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFillDemoValues = () => {
    setFormData({
      name: "Alex Patel",
      age: 22,
      education: "B.Tech Computer Science",
      level: "Beginner",
      skills: "Python 3 basics, Git, Basic SQL, HTML/CSS",
      interests: "Generative AI, LLMs, Automation, Full-Stack",
      strengths: "Logical thinking, Fast self-learner, Collaborative",
      weaknesses: "Overthinking architecture, Need step-by-step guidance on advanced ML",
      hobbies: "Strategy board games, Sci-Fi reading, Podcast listening",
      goals: "Become a proficient Full-Stack AI Engineer building RAG applications",
      weekly_hours: 14,
      preferred_style: "Interactive Projects & Video Lectures"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      setStage("Saving profile to database (MySQL)...");
      await axios.post(`${API_BASE}/api/students`, {
        ...formData,
        age: Number(formData.age || 20),
        weekly_hours: Number(formData.weekly_hours || 10)
      });

      setStage("Retrieving relevant syllabus via RAG knowledge base...");
      await new Promise((r) => setTimeout(r, 600));

      setStage("Synthesizing personalized path with Google AI Studio (Gemini)...");
      const clientKey = localStorage.getItem("custom_gemini_key") || undefined;
      const res = await axios.post(`${API_BASE}/api/learning-path/generate`, {
        student: { ...formData, age: Number(formData.age), weekly_hours: Number(formData.weekly_hours) },
        api_key: clientKey
      });

      setSuccessMsg("AI Personalized Learning Path generated successfully!");
      onSaveAndGenerate(formData, res.data);
    } catch (err) {
      alert("Error generating path: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
      setStage("");
    }
  };

  return (
    <div className="form-container">
      <div className="form-header-box">
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Student Assessment & Skills Analysis</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
            Add your strengths, weaknesses, hobbies, and interests to allow AI to craft your custom learning path.
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={handleFillDemoValues}>
          <Sparkles size={16} /> Fill Demo Student Data
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid-layout">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-input"
                value={formData.age}
                onChange={handleChange}
                min="10"
                max="90"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Education Background</label>
              <input
                type="text"
                name="education"
                className="form-input"
                placeholder="e.g. Undergraduate / High School / Working Pro"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Experience Level</label>
              <select name="level" className="form-select" value={formData.level} onChange={handleChange}>
                <option value="Beginner">Beginner (Starting from basics)</option>
                <option value="Intermediate">Intermediate (Some coding experience)</option>
                <option value="Advanced">Advanced (Looking to master AI & RAG)</option>
              </select>
            </div>

            <div className="form-group span-full">
              <label className="form-label">
                Current Technical Skills
                <span className="form-label-hint">What languages or tools do you know?</span>
              </label>
              <textarea
                name="skills"
                className="form-textarea"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. Python, basic HTML/CSS, Git, basic mathematics"
                rows={2}
                required
              />
            </div>

            <div className="form-group span-full">
              <label className="form-label">
                Passionate Interests
                <span className="form-label-hint">What fields excite you most?</span>
              </label>
              <textarea
                name="interests"
                className="form-textarea"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g. Artificial Intelligence, Machine Learning, Web App Development, Automation"
                rows={2}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Core Strengths
                <span className="form-label-hint">What are you naturally good at?</span>
              </label>
              <textarea
                name="strengths"
                className="form-textarea"
                value={formData.strengths}
                onChange={handleChange}
                placeholder="e.g. Fast problem solving, strong curiosity, visual learner"
                rows={2}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Areas for Improvement / Weaknesses
                <span className="form-label-hint">Where do you struggle or need support?</span>
              </label>
              <textarea
                name="weaknesses"
                className="form-textarea"
                value={formData.weaknesses}
                onChange={handleChange}
                placeholder="e.g. Time management, math formulas, complex debugging, staying consistent"
                rows={2}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Hobbies & Fun Activities
                <span className="form-label-hint">AI uses this to personalize project themes!</span>
              </label>
              <textarea
                name="hobbies"
                className="form-textarea"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder="e.g. Chess, gaming, reading, music, cricket"
                rows={2}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Target Career Goal / Ambition
                <span className="form-label-hint">What do you want to accomplish?</span>
              </label>
              <textarea
                name="goals"
                className="form-textarea"
                value={formData.goals}
                onChange={handleChange}
                placeholder="e.g. Become a full-stack AI engineer building intelligent applications"
                rows={2}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Available Study Hours / Week</label>
              <input
                type="number"
                name="weekly_hours"
                className="form-input"
                value={formData.weekly_hours}
                onChange={handleChange}
                min="2"
                max="60"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Learning Style</label>
              <select
                name="preferred_style"
                className="form-select"
                value={formData.preferred_style}
                onChange={handleChange}
              >
                <option value="Interactive Projects & Video Lectures">Interactive Projects & Video Lectures</option>
                <option value="Self-Paced Code Exercises">Self-Paced Code Exercises</option>
                <option value="Theory First & Math Foundations">Theory First & Math Foundations</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "16px" }}>
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: "12px 28px" }}>
              {loading ? (
                <>
                  <RefreshCw className="spin" size={18} /> Analyzing Assessment...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Analyze with AI & Generate Learning Path
                </>
              )}
            </button>
            {loading && <span style={{ fontSize: "13px", color: "var(--secondary)" }}>{stage}</span>}
          </div>
        </form>

        {successMsg && (
          <div style={{ marginTop: "20px", padding: "14px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "10px", color: "#10b981", display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle2 size={18} /> {successMsg}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. AI LEARNING PATH VIEW (RAG + GEMINI)
// ==========================================
function LearningPathView({ path, onRegenerate, profile, onNavigate }) {
  if (!path) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
        <BrainCircuit size={60} color="#6366f1" style={{ marginBottom: "16px" }} />
        <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>No Learning Path Generated Yet</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto 24px" }}>
          Fill in your skills, strengths, weaknesses, and hobbies in the Student Assessment form to generate your AI roadmap.
        </p>
        <button className="btn-primary" onClick={() => onNavigate("assessment")}>
          Go to Student Assessment <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="path-hero-card">
        <div className="rag-badge-group">
          <span className="rag-pill">
            <Database size={13} /> RAG Curriculum Grounded
          </span>
          <span className="llm-pill">
            <Sparkles size={13} /> Google AI Studio (Gemini)
          </span>
          {(path.rag_sources || []).map((source, idx) => (
            <span key={idx} className="chip-option active" style={{ fontSize: "11px", padding: "4px 10px" }}>
              📚 {source}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>
              {path.title}
            </h1>
            <p style={{ color: "#cbd5e1", maxWidth: "800px", lineHeight: "1.6", fontSize: "15px" }}>
              {path.summary}
            </p>
          </div>
          <button className="btn-secondary" onClick={onRegenerate} style={{ flexShrink: 0 }}>
            <RefreshCw size={15} /> Regenerate
          </button>
        </div>

        <div style={{ display: "flex", gap: "24px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase" }}>Target Role</span>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--secondary)" }}>{path.target_role || "AI Engineer"}</div>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase" }}>Estimated Duration</span>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>{path.estimated_weeks || 12} Weeks</div>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase" }}>Weekly Commitment</span>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>{path.weekly_hours_target || 10} Hours/Week</div>
          </div>
        </div>
      </div>

      {/* AI Strategy Breakdown */}
      <div className="ai-strategy-grid">
        <div className="strategy-box">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", color: "#10b981", fontWeight: "700" }}>
            <CheckCircle2 size={18} /> Strength Acceleration Strategy
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            {path.strength_analysis || "Leverages your core strengths to accelerate through high-impact technical milestones."}
          </p>
        </div>

        <div className="strategy-box">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", color: "#f59e0b", fontWeight: "700" }}>
            <Sliders size={18} /> Weakness Mitigation Strategy
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            {path.weakness_strategy || "Incorporates structured exercises, bite-sized tasks, and checkpoint quizzes to conquer challenging areas."}
          </p>
        </div>
      </div>

      {/* Sequential Roadmap Steps */}
      <div className="timeline-roadmap">
        {(path.steps || []).map((step, idx) => (
          <div className="roadmap-step-card" key={idx}>
            <div className="step-indicator">{idx + 1}</div>
            <div className="step-content">
              <div className="step-header">
                <div>
                  <div className="step-phase">{step.phase || `Phase ${idx + 1}`}</div>
                  <div className="step-topic">{step.topic}</div>
                </div>
                <div className="step-badges">
                  <span className="chip-option" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc" }}>
                    ⏱️ {step.duration}
                  </span>
                  <span className="chip-option" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#67e8f9" }}>
                    ⭐ {step.difficulty}
                  </span>
                </div>
              </div>

              <p className="step-desc">{step.description}</p>

              <div className="step-details-grid">
                <div className="detail-item">
                  <strong>Recommended Courses</strong>
                  <span>{(step.recommended_courses || []).join(", ") || "Python Fundamentals for AI"}</span>
                </div>
                <div className="detail-item">
                  <strong>Recommended Videos</strong>
                  <span>{(step.recommended_videos || []).join(", ") || "Foundations Overview Video"}</span>
                </div>
                <div className="detail-item">
                  <strong>Personalized Project Task</strong>
                  <span style={{ color: "var(--secondary)", fontWeight: "500" }}>{step.project_task}</span>
                </div>
                <div className="detail-item">
                  <strong>Quiz Milestone</strong>
                  <span style={{ color: "#f59e0b", fontWeight: "500" }}>{step.quiz_milestone}</span>
                </div>
              </div>

              <div>
                <strong style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Skills You Will Acquire
                </strong>
                <div className="skill-tags">
                  {(step.skills_gained || []).map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. COURSES CATALOG VIEW
// ==========================================
function CoursesView({ onNavigate }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error loading courses:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Curated Courses Catalog</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
            Comprehensive curricula referenced by your AI learning path
          </p>
        </div>
        <button className="btn-secondary" onClick={() => onNavigate("videos")}>
          <Video size={16} /> Switch to Video Lectures
        </button>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-header">
              <span className="course-emoji">{course.thumbnail_icon || "📘"}</span>
              <span className="chip-option" style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff", border: "none" }}>
                {course.level}
              </span>
            </div>
            <div className="course-body">
              <span style={{ fontSize: "11px", color: "var(--secondary)", fontWeight: "600", textTransform: "uppercase" }}>
                {course.category}
              </span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>{course.lessons_count || 12} Lessons • {course.duration}</span>
                <span>By {course.instructor}</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill" style={{ width: course.id === 1 ? "65%" : course.id === 2 ? "40%" : "15%" }} />
              </div>

              <button className="btn-primary" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }} onClick={() => onNavigate("videos")}>
                View Lectures <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. VIDEO LECTURES THEATER (POINT 2 OF PROMPT)
// ==========================================
function VideoLecturesView() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [completedMap, setCompletedMap] = useState({});

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/video-lectures`)
      .then((res) => {
        setVideos(res.data);
        if (res.data.length > 0) setActiveVideo(res.data[0]);
      })
      .catch((err) => console.error("Error loading video lectures:", err));
  }, []);

  const toggleCompleted = (id) => {
    setCompletedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Video Lectures & Masterclasses</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
          Watch curated lessons mapped to your personalized learning path
        </p>
      </div>

      <div className="video-theater-layout">
        {/* Left: Player */}
        <div>
          <div className="video-player-container">
            {activeVideo ? (
              <div className="video-iframe-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtube_id}?rel=0&autoplay=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div style={{ height: "400px", display: "grid", placeItems: "center" }}>
                <span>Select a video lecture to watch</span>
              </div>
            )}
          </div>

          {activeVideo && (
            <div className="card video-details-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span className="rag-pill" style={{ marginBottom: "8px" }}>Topic: {activeVideo.topic}</span>
                  <h3 style={{ fontSize: "20px", marginTop: "4px" }}>{activeVideo.title}</h3>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                    Instructor: {activeVideo.instructor} • Duration: {activeVideo.duration}
                  </div>
                </div>
                <button
                  className={`btn-secondary ${completedMap[activeVideo.id] ? "text-success" : ""}`}
                  onClick={() => toggleCompleted(activeVideo.id)}
                >
                  <CheckCircle2 size={16} />
                  {completedMap[activeVideo.id] ? "Completed ✓" : "Mark as Watched"}
                </button>
              </div>

              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                <h4 style={{ fontSize: "14px", marginBottom: "6px" }}>Lecture Description & Key Takeaways</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  {activeVideo.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Playlist */}
        <div>
          <div className="card">
            <h3 style={{ fontSize: "16px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Layers size={18} color="#6366f1" /> Course Video Playlist
            </h3>
            <div className="playlist-sidebar">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className={`playlist-item ${activeVideo?.id === vid.id ? "active" : ""}`}
                  onClick={() => setActiveVideo(vid)}
                >
                  <div className="playlist-thumb">
                    {completedMap[vid.id] ? <CheckCircle2 size={20} color="#10b981" /> : <Play size={18} />}
                  </div>
                  <div className="playlist-info">
                    <h4>{vid.title}</h4>
                    <span>{vid.duration} • {vid.topic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. INTERACTIVE QUIZ & TESTING (POINT 2 OF PROMPT)
// ==========================================
function QuizView() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    axios
      .get(`${API_BASE}/api/quizzes`)
      .then((res) => {
        setQuestions(res.data);
        setAnswers({});
        setResult(null);
      })
      .catch((err) => console.error("Error loading quizzes:", err));
  };

  const handleSelect = (qid, opt) => {
    setAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/api/quizzes/submit`, {
        topic: "AI & Machine Learning Concepts",
        answers
      });
      setResult(res.data);
    } catch (err) {
      alert("Error submitting quiz: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quiz-box">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700" }}>AI Knowledge Check & Skill Quizzes</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
            Test your conceptual understanding to benchmark your AI skills profile
          </p>
        </div>
        {result && (
          <button className="btn-secondary" onClick={loadQuestions}>
            <RefreshCw size={15} /> Retake Quiz
          </button>
        )}
      </div>

      {!result ? (
        <div>
          {questions.map((q, idx) => (
            <div className="question-card" key={q.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span className="rag-pill">Question {idx + 1} of {questions.length}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Topic: {q.topic}</span>
              </div>
              <div className="question-prompt">{q.question}</div>

              <div className="options-list">
                {[
                  ["A", q.option_a],
                  ["B", q.option_b],
                  ["C", q.option_c],
                  ["D", q.option_d]
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={`option-btn ${answers[q.id] === key ? "selected" : ""}`}
                    onClick={() => handleSelect(q.id, key)}
                  >
                    <span className="option-key">{key}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <button
              className="btn-primary"
              style={{ padding: "12px 32px" }}
              onClick={handleSubmit}
              disabled={submitting || Object.keys(answers).length === 0}
            >
              {submitting ? <RefreshCw className="spin" size={16} /> : "Submit Quiz for Evaluation"}
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-result-card">
          <Award size={64} color="#6366f1" style={{ margin: "0 auto" }} />
          <h2 style={{ fontSize: "26px", marginTop: "12px" }}>Quiz Evaluation Complete!</h2>
          <div className="score-badge">{result.percentage}%</div>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
            You scored <strong>{result.score}</strong> out of <strong>{result.total}</strong> questions correctly.
          </p>
          <div style={{ margin: "16px 0" }}>
            <span className="status-chip" style={{ fontSize: "13px", padding: "8px 16px" }}>
              🏆 Achievement Badge: {result.badge}
            </span>
          </div>

          <div style={{ marginTop: "32px", textAlign: "left" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Question Review & Explanations</h3>
            {result.review?.map((rev, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-surface-elevated)",
                  padding: "18px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  borderLeft: rev.is_correct ? "4px solid #10b981" : "4px solid #ef4444"
                }}
              >
                <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "6px" }}>
                  {i + 1}. {rev.question}
                </div>
                <div style={{ fontSize: "13px", color: rev.is_correct ? "#10b981" : "#ef4444", marginBottom: "4px" }}>
                  Your Choice: Option {rev.selected_option} {rev.is_correct ? "✓ Correct" : "✗ Incorrect"}
                </div>
                {!rev.is_correct && (
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Correct Answer: Option {rev.correct_option}
                  </div>
                )}
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", fontStyle: "italic" }}>
                  💡 {rev.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. PERFORMANCE & ANALYTICS (POINT 2 OF PROMPT)
// ==========================================
function PerformanceView() {
  const [perf, setPerf] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/performance`)
      .then((res) => setPerf(res.data))
      .catch((err) => console.error("Error loading performance:", err));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Performance & Competency Analytics</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
          Track your skill mastery metrics, quiz scores, and weak-area improvements
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#6366f1" }}>
            <Award size={24} />
          </div>
          <div>
            <div className="stat-label">Overall Mastery</div>
            <div className="stat-value">{perf?.overall_mastery || "84%"}</div>
            <div className="stat-detail text-success">Strong Progress</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
            <ClipboardCheck size={24} />
          </div>
          <div>
            <div className="stat-label">Average Quiz Score</div>
            <div className="stat-value">{perf?.quiz_average || "82%"}</div>
            <div className="stat-detail text-success">Above 80% benchmark</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-label">Total Study Time</div>
            <div className="stat-value">{perf?.total_study_hours || 16.5}h</div>
            <div className="stat-detail text-secondary">Logged in portal</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-label">Quizzes Completed</div>
            <div className="stat-value">{perf?.total_quizzes_taken || 4}</div>
            <div className="stat-detail text-warning">Verified Attempts</div>
          </div>
        </div>
      </div>

      <div className="performance-grid">
        <div className="card">
          <h3 className="card-title">Skill Mastery Breakdown</h3>
          <p className="card-subtitle">AI assessment of competencies based on tests and activities</p>

          {(perf?.skills_breakdown || []).map((sk, idx) => (
            <div className="skill-bar-row" key={idx}>
              <div className="skill-bar-header">
                <strong>{sk.skill}</strong>
                <span className={sk.status === "Strong" ? "text-success" : sk.status === "Improving" ? "text-secondary" : "text-warning"}>
                  {sk.score}% ({sk.status})
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${sk.score}%`,
                    background: sk.score >= 80 ? "#10b981" : sk.score >= 70 ? "#06b6d4" : "#f59e0b"
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="card-title">Recent Quiz Attempts</h3>
          <p className="card-subtitle">Saved test records from MySQL database</p>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {(perf?.recent_attempts || []).length > 0 ? (
                  perf.recent_attempts.map((att, idx) => (
                    <tr key={idx}>
                      <td>{att.topic}</td>
                      <td>{att.score}/{att.total_questions}</td>
                      <td>
                        <span className={att.percentage >= 80 ? "text-success" : "text-warning"} style={{ fontWeight: "700" }}>
                          {att.percentage}%
                        </span>
                      </td>
                      <td style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                        {att.created_at ? new Date(att.created_at).toLocaleDateString() : "Today"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "var(--text-muted)" }}>
                      Take a quiz to view past results here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. PROGRESS & MILESTONES (POINT 2 OF PROMPT)
// ==========================================
function ProgressView() {
  const [prog, setProg] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/progress`)
      .then((res) => setProg(res.data))
      .catch((err) => console.error("Error loading progress:", err));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Learning Milestones & Progress</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
          Milestone tracker aligning your weekly study with target learning goals
        </p>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h3 className="card-title">Curriculum Milestones Checklist</h3>
        <p className="card-subtitle">Sequential steps completed in your personalized path</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {(prog?.milestones || []).map((m, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: "12px",
                background: "var(--bg-surface-elevated)",
                border: "1px solid var(--border)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: m.completed ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    color: m.completed ? "#10b981" : "#64748b"
                  }}
                >
                  {m.completed ? <Check size={18} /> : <span>{idx + 1}</span>}
                </div>
                <div>
                  <h4 style={{ fontSize: "15px", color: m.completed ? "#fff" : "var(--text-secondary)" }}>{m.title}</h4>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{m.date}</span>
                </div>
              </div>
              <span className={`chip-option ${m.completed ? "active" : ""}`} style={{ fontSize: "11px" }}>
                {m.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. SETTINGS & API CONFIGURATION (POINT 2 & 4 OF PROMPT)
// ==========================================
function SettingsView() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("custom_gemini_key") || "");
  const [dbStatus, setDbStatus] = useState("Checking...");
  const [verifying, setVerifying] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/health`)
      .then((res) => setDbStatus(`${res.data.database_mode} (${res.data.mysql_connected ? "Connected to MySQL Workbench" : "Local Standalone Storage"})`))
      .catch(() => setDbStatus("Offline / Unreachable"));
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem("custom_gemini_key", apiKey.trim());
    setVerifyMsg("Google AI Studio API key saved locally in browser.");
  };

  const handleVerify = async () => {
    if (!apiKey.trim()) {
      alert("Please enter a Google AI Studio API key first.");
      return;
    }
    setVerifying(true);
    setVerifyMsg("");
    try {
      const res = await axios.post(`${API_BASE}/api/settings/verify-key`, { api_key: apiKey.trim() });
      setVerifyMsg("✓ Key Verified! " + res.data.message);
      localStorage.setItem("custom_gemini_key", apiKey.trim());
    } catch (err) {
      setVerifyMsg("✗ " + (err.response?.data?.detail || "Key verification failed."));
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>System & AI Settings</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
          Configure Google AI Studio (Gemini) API Key, verify MySQL database, and set learning preferences
        </p>
      </div>

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 className="card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Key size={18} color="#6366f1" /> Google AI Studio API Key Configuration
        </h3>
        <p className="card-subtitle">
          Add your Google Gemini API key here or in backend <code>.env</code> to generate personalized learning paths.
        </p>

        <div className="form-group" style={{ marginBottom: "16px" }}>
          <label className="form-label">Google AI Studio API Key</label>
          <input
            type="password"
            className="form-input"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-primary" onClick={handleSaveKey}>
            Save Key
          </button>
          <button className="btn-secondary" onClick={handleVerify} disabled={verifying}>
            {verifying ? <RefreshCw className="spin" size={15} /> : "Verify API Key"}
          </button>
        </div>

        {verifyMsg && (
          <div style={{ marginTop: "14px", fontSize: "13px", color: verifyMsg.startsWith("✓") ? "#10b981" : "#ef4444" }}>
            {verifyMsg}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 className="card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Database size={18} color="#06b6d4" /> Database Backend Status (MySQL Workbench)
        </h3>
        <p className="card-subtitle">Current active database storage connection</p>
        <div style={{ background: "var(--bg-surface-elevated)", padding: "16px", borderRadius: "10px", fontSize: "14px" }}>
          <strong>Status: </strong> <span style={{ color: "var(--secondary)" }}>{dbStatus}</span>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px" }}>
            To connect MySQL Workbench: execute <code>schema.sql</code> in MySQL Workbench and set <code>MYSQL_PASSWORD</code> in <code>Backend/.env</code>.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT & ROUTER
// ==========================================
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [learningPath, setLearningPath] = useState(null);
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("learnai_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser({ name: "Student", email: "student@example.com" });
      }
    }

    // Load initial student profile & path
    axios
      .get(`${API_BASE}/api/students/profile`)
      .then((res) => setProfile(res.data))
      .catch((e) => console.log("Profile notice:", e));

    axios
      .get(`${API_BASE}/api/learning-path/latest`)
      .then((res) => setLearningPath(res.data))
      .catch((e) => console.log("Path notice:", e));

    axios
      .get(`${API_BASE}/api/progress`)
      .then((res) => setProgressData(res.data))
      .catch((e) => console.log("Progress notice:", e));
  }, []);

  if (!user) {
    return <AuthPage onLoginSuccess={setUser} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("learnai_token");
    localStorage.removeItem("learnai_user");
    setUser(null);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "assessment", label: "Student Assessment", icon: UserRound },
    { id: "path", label: "AI Learning Path", icon: Route },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "videos", label: "Video Lectures", icon: Video },
    { id: "quiz", label: "Skill Quizzes", icon: ClipboardCheck },
    { id: "performance", label: "Performance", icon: BarChart3 },
    { id: "progress", label: "Milestones", icon: TrendingUp },
    { id: "settings", label: "Settings & API", icon: Settings }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand-header">
          <div className="brand-icon">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="brand-title">LearnAI</div>
            <div className="brand-sub">Path Optimizer</div>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? "active" : ""}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-badge">
            <div className="user-avatar">
              {user.name ? user.name[0].toUpperCase() : "S"}
            </div>
            <div className="user-details">
              <div className="user-name">{user.name || "Student"}</div>
              <div className="user-role">{user.email || "student@example.com"}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-navbar">
          <div className="page-title">
            <h1>{navItems.find((n) => n.id === currentPage)?.label || "Dashboard"}</h1>
            <div className="page-subtitle">AI Personalized Learning Path System</div>
          </div>

          <div className="top-actions">
            <div className="status-chip">
              <div className="status-dot" />
              <span>RAG Engine Active</span>
            </div>
          </div>
        </header>

        <div className="content-body">
          {currentPage === "dashboard" && (
            <DashboardView
              onNavigate={setCurrentPage}
              studentProfile={profile}
              learningPath={learningPath}
              progressData={progressData}
            />
          )}

          {currentPage === "assessment" && (
            <StudentAssessmentForm
              profile={profile}
              onSaveAndGenerate={(newProfile, newPath) => {
                setProfile(newProfile);
                setLearningPath(newPath);
                setCurrentPage("path");
              }}
            />
          )}

          {currentPage === "path" && (
            <LearningPathView
              path={learningPath}
              profile={profile}
              onRegenerate={() => setCurrentPage("assessment")}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === "courses" && <CoursesView onNavigate={setCurrentPage} />}

          {currentPage === "videos" && <VideoLecturesView />}

          {currentPage === "quiz" && <QuizView />}

          {currentPage === "performance" && <PerformanceView />}

          {currentPage === "progress" && <ProgressView />}

          {currentPage === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
