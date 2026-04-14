import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "../../context/ThemeContext";

const PAGE_TITLES = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/dashboard/candidates": "Candidates",
  "/dashboard/settings": "Settings",
  "/jobs": "Job Listings",
  "/login": "Login",
  "/register": "Register",
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || "TalentFlow";
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: darkMode ? "#0f172a" : "#f0f2f5",
      }}
    >
      {/* Sidebar — sticky */}
      <div
        style={{
          width: collapsed ? 72 : 260,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} darkMode={darkMode} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar pageTitle={pageTitle} darkMode={darkMode} toggleTheme={toggleTheme} />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: darkMode ? "#0f172a" : "#f0f2f5",
            padding: "24px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
