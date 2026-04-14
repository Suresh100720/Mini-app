import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip, Avatar, Badge } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BarChartOutlined,
  BellOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ui/ConfirmModal";

const navItems = [
  { key: "home", label: "Home", icon: <HomeOutlined />, path: "/", exact: true },
  { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard", protected: true },
  { key: "jobs", label: "Jobs", icon: <ProfileOutlined />, path: "/jobs" },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavClick = (item, e) => {
    if (item.protected && !isAuthenticated) {
      e.preventDefault();
      navigate("/login", { state: { from: { pathname: item.path } } });
    }
  };

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo" style={collapsed ? { flexDirection: "column", gap: "1rem", padding: "1.5rem 0" } : {}}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
          >
            <RocketOutlined style={{ color: "white" }} />
          </div>
          {!collapsed && (
            <div>
              <div style={{ color: "var(--text-primary)", fontWeight: 800, fontSize: "1rem" }}>TalentFlow</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.7rem" }}>HR Platform</div>
            </div>
          )}
          <button
            onClick={onToggle}
            style={{
              marginLeft: collapsed ? "0" : "auto",
              marginBlock: "auto",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "1rem",
              padding: "4px",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            if (item.protected && !isAuthenticated) return null; // Hide from Sidebar if not logged in

            return (
              <div key={item.key}>
                <Tooltip title={collapsed ? item.label : ""} placement="right">
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    <span className="icon">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </Tooltip>

                {/* Nested Links for Dashboard */}
                {item.key === "dashboard" && isAuthenticated && !collapsed && (
                  <div style={{ marginLeft: "2.5rem", marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: 4 }}>
                    <NavLink to="/dashboard/candidates" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} style={{ padding: "0.5rem 1rem", fontSize: "0.80rem", textDecoration: "none" }}>
                      <TeamOutlined style={{ marginRight: 8, fontSize: "1.1rem" }} /> Candidates
                    </NavLink>
                    <NavLink to="/dashboard/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} style={{ padding: "0.5rem 1rem", fontSize: "0.80rem", textDecoration: "none" }}>
                      <SettingOutlined style={{ marginRight: 8, fontSize: "1.1rem" }} /> Settings
                    </NavLink>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User section */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid var(--border)" }}>
          {isAuthenticated ? (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "10px",
                  background: "rgba(99,102,241,0.08)",
                  marginBottom: "0.5rem",
                }}
              >
                <Avatar
                  size={32}
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", flexShrink: 0 }}
                >
                  {user?.name?.[0]?.toUpperCase()}
                </Avatar>
                {!collapsed && (
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ color: "var(--text-primary)", fontSize: "0.8rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {user?.name}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "0.7rem" }}>{user?.role}</div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowLogout(true)}
                className="nav-item"
                style={{ width: "100%", border: "none", background: "none", color: "#ef4444", justifyContent: collapsed ? "center" : "flex-start" }}
              >
                <LogoutOutlined />
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-item" style={{ background: "rgba(99,102,241,0.15)", color: "var(--primary-light)" }}>
              <span>🔑</span>
              {!collapsed && <span>Login</span>}
            </NavLink>
          )}
        </div>
      </div>

      <ConfirmModal
        open={showLogout}
        title="Logout"
        content="Are you sure you want to logout?"
        okText="Logout"
        danger
        onOk={handleLogout}
        onCancel={() => setShowLogout(false)}
      />
    </>
  );
};

export default Sidebar;
