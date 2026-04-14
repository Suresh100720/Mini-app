import { Tag } from "antd";

const STATUS_COLORS = {
  Applied: { color: "#3b82f6", bg: "#3b82f620" },
  Screening: { color: "#8b5cf6", bg: "#8b5cf620" },
  Interview: { color: "#f59e0b", bg: "#f59e0b20" },
  Offered: { color: "#06b6d4", bg: "#06b6d420" },
  Hired: { color: "#10b981", bg: "#10b98120" },
  Rejected: { color: "#ef4444", bg: "#ef444420" },
  Open: { color: "#10b981", bg: "#10b98120" },
  Closed: { color: "#ef4444", bg: "#ef444420" },
  Paused: { color: "#f59e0b", bg: "#f59e0b20" },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_COLORS[status] || { color: "#94a3b8", bg: "#94a3b820" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.2rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}40`,
        letterSpacing: "0.025em",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: config.color,
          marginRight: "0.4rem",
          display: "inline-block",
        }}
      />
      {status}
    </span>
  );
};

export { STATUS_COLORS };
export default StatusBadge;
