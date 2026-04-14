import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = ({ fullscreen = false, tip = "Loading..." }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 40, color: "var(--primary)" }} spin />;

  if (fullscreen) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-dark)",
          gap: 16,
        }}
      >
        <Spin indicator={antIcon} />
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{tip}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem",
        gap: 12,
        color: "var(--text-secondary)",
      }}
    >
      <Spin indicator={antIcon} />
      <span>{tip}</span>
    </div>
  );
};

export default LoadingSpinner;
