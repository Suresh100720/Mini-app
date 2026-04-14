import { Badge, Avatar, Dropdown, Input, Button } from "antd";
import { SearchOutlined, UserOutlined, LoginOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Topbar = ({ pageTitle = "Dashboard" }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const userMenuItems = [
    {
      key: "profile",
      label: <span style={{ color: "var(--text-primary)" }}>Profile</span>,
      icon: <UserOutlined />,
    },
    { type: "divider" },
    {
      key: "logout",
      label: <span style={{ color: "#ef4444" }}>Logout</span>,
      onClick: () => {
        logout();
        navigate("/");
      },
    },
  ];

  return (
    <div className="topbar">
      <div>
        <h1
          style={{
            color: "var(--text-primary)",
            fontSize: "1.25rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          {pageTitle}
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {location.pathname !== "/" && (
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: "var(--text-secondary)" }} />}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              color: "var(--text-primary)",
              width: 220,
            }}
          />
        )}

        <button
          onClick={toggleTheme}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-secondary)",
          }}
        >
          {theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
        </button>

        {isAuthenticated ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                padding: "0.25rem 0.75rem",
                borderRadius: "10px",
                background: "rgba(99,102,241,0.1)",
                border: "1px solid var(--border)",
              }}
            >
              <Avatar
                size={28}
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                {user?.name?.[0]?.toUpperCase()}
              </Avatar>
              <span style={{ color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 500 }}>
                {user?.name}
              </span>
            </div>
          </Dropdown>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="btn-primary-custom"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <LoginOutlined /> Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
