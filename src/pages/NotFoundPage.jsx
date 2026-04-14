import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative blobs */}
      <div style={{ position: "absolute", top: "20%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.06)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 250, height: 250, borderRadius: "50%", background: "rgba(139,92,246,0.06)", filter: "blur(50px)" }} />

      <div className="fade-in-up" style={{ position: "relative", zIndex: 1 }}>
        {/* Giant 404 */}
        <div
          style={{
            fontSize: "clamp(6rem, 20vw, 12rem)",
            fontWeight: 900,
            lineHeight: 1,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </div>

        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>

        <h2 style={{ color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Houston, we have a problem!
        </h2>

        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 450, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          The page you're looking for has drifted off into the cosmos. It might have been moved, deleted, or never existed.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              borderRadius: 12,
              height: 48,
              padding: "0 1.5rem",
              fontWeight: 600,
            }}
          >
            Go Back
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: 12,
              height: 48,
              padding: "0 1.5rem",
              fontWeight: 700,
            }}
          >
            Back to Home
          </Button>
        </div>

        {/* Quick links */}
        <div style={{ marginTop: "3rem" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>Popular pages:</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Candidates", path: "/dashboard/candidates" },
              { label: "Jobs", path: "/jobs" },
              { label: "Login", path: "/login" },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "var(--primary-light)",
                  borderRadius: 8,
                  padding: "0.35rem 0.85rem",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
