import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CandidateProvider } from "./context/CandidateContext";
import { useTheme } from "./context/ThemeContext";
import { theme } from "antd";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { theme: currentTheme } = useTheme();

  const antTheme = {
    algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#6366f1",
      fontFamily: "'Inter', -apple-system, sans-serif",
      colorSuccess: "#10b981",
      colorWarning: "#f59e0b",
      colorError: "#ef4444",
      colorInfo: "#3b82f6",
      borderRadius: 10,
    },
    components: {
      Button: { borderRadius: 8 },
    },
  };

  return (
    <ConfigProvider theme={antTheme}>
      <AuthProvider>
        <CandidateProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CandidateProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
