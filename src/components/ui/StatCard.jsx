import { Card, Statistic } from "antd";

const StatCard = ({ title, value, prefix, suffix, icon, color, bgGradient, onClick, isActive }) => {
  return (
    <div
      className={`stat-card-clickable ${isActive ? "active" : ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Card
        style={{
          background: bgGradient || "var(--bg-card)",
          border: isActive
            ? "2px solid var(--primary)"
            : "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s ease",
        }}
        bodyStyle={{ padding: "1.25rem" }}
      >
        {/* Decorative bg circle */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: color ? `${color}20` : "rgba(99,102,241,0.1)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
              }}
            >
              {title}
            </p>
            <Statistic
              value={value}
              prefix={prefix}
              suffix={suffix}
              valueStyle={{
                color: color || "var(--text-primary)",
                fontSize: "2rem",
                fontWeight: 800,
                lineHeight: 1,
              }}
            />
          </div>
          {icon && (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: color ? `${color}25` : "rgba(99,102,241,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
          )}
        </div>
        {onClick && (
          <p
            style={{
              color: color || "var(--primary-light)",
              fontSize: "0.72rem",
              marginTop: "0.75rem",
              fontWeight: 500,
            }}
          >
            Click to filter →
          </p>
        )}
      </Card>
    </div>
  );
};

export default StatCard;
