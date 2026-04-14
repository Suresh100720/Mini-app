import { useNavigate } from "react-router-dom";
import { Button, Tag, Tooltip } from "antd";
import {
  RocketOutlined,
  TeamOutlined,
  ProfileOutlined,
  BarChartOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const FEATURES = [
  { icon: "📊", title: "Smart Dashboard", desc: "Real-time analytics and insights for your hiring pipeline with interactive charts.", color: "#6366f1", bg: "rgba(99,102,241,0.15)" },
  { icon: "👥", title: "Candidate Management", desc: "Manage all candidates with powerful filtering, sorting, and bulk actions.", color: "#8b5cf6", bg: "rgba(139,92,246,0.15)" },
  { icon: "💼", title: "Job Listings", desc: "Post and manage job openings. Public-facing listings that drive applications.", color: "#06b6d4", bg: "rgba(6,182,212,0.15)" },
  { icon: "🔒", title: "Secure Auth", desc: "JWT-based authentication with protected routes and role-based access.", color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  { icon: "⚡", title: "AG Grid Tables", desc: "Enterprise-grade data tables with sorting, filtering, and column resizing.", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  { icon: "📈", title: "Interactive Charts", desc: "Beautiful Recharts visualizations — pie, bar, area, and radar charts.", color: "#ec4899", bg: "rgba(236,72,153,0.15)" },
];

const STATS = [
  { value: "500+", label: "Companies Trust Us", icon: "🏢" },
  { value: "10K+", label: "Candidates Placed", icon: "🎯" },
  { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
  { value: "50+", label: "Features", icon: "✨" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <div className="fade-in-up">
            <Tag
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "#a5b4fc",
                borderRadius: "9999px",
                padding: "0.25rem 1rem",
                marginBottom: "1.5rem",
                fontSize: "0.85rem",
              }}
            >
              🚀 Next-Gen HR Platform
            </Tag>
          </div>

          <h1
            className="fade-in-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              animationDelay: "0.1s",
            }}
          >
            <span className="gradient-text">Hire Smarter,</span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>Grow Faster</span>
          </h1>

          <p
            className="fade-in-up"
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: 600,
              margin: "0 auto 2.5rem",
              animationDelay: "0.2s",
            }}
          >
            TalentFlow is your all-in-one recruitment platform. Manage candidates, post jobs, and get data-driven insights — all in one beautifully designed dashboard.
          </p>

          <div
            className="fade-in-up"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              animationDelay: "0.3s",
            }}
          >
            {isAuthenticated ? (
              <Button
                size="large"
                icon={<DashboardOutlined />}
                onClick={() => navigate("/dashboard")}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  color: "white",
                  borderRadius: 12,
                  height: 52,
                  padding: "0 2rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                Go to Dashboard <ArrowRightOutlined />
              </Button>
            ) : (
              <>
                <Button
                  size="large"
                  onClick={() => navigate("/register")}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none",
                    color: "white",
                    borderRadius: 12,
                    height: 52,
                    padding: "0 2rem",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Get Started Free <RocketOutlined />
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate("/jobs")}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    borderRadius: 12,
                    height: 52,
                    padding: "0 2rem",
                    fontWeight: 600,
                  }}
                >
                  Browse Jobs <ProfileOutlined />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Floating decorative elements */}
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "rgba(99,102,241,0.05)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(139,92,246,0.05)", filter: "blur(60px)" }} />
      </section>

      {/* Stats Section */}
      <section style={{ padding: "3rem 2rem", background: "rgba(99,102,241,0.03)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--primary-light)" }}>{s.value}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ color: "var(--text-primary)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "1rem" }}>
              Everything you need to <span className="gradient-text">hire better</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 500, margin: "0 auto" }}>
              A complete suite of tools designed for modern HR teams
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg }}>
                  {f.icon}
                </div>
                <h3 style={{ color: "var(--text-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 100%)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ color: "var(--text-primary)", fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>
            Ready to transform your hiring?
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            Join thousands of companies already using TalentFlow to build great teams.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {!isAuthenticated && (
              <Button
                size="large"
                onClick={() => navigate("/register")}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  color: "white",
                  borderRadius: 12,
                  height: 48,
                  padding: "0 2rem",
                  fontWeight: 700,
                }}
              >
                Start for Free
              </Button>
            )}
            <Button
              size="large"
              onClick={() => navigate("/jobs")}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                borderRadius: 12,
                height: 48,
                padding: "0 2rem",
              }}
            >
              View Open Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
