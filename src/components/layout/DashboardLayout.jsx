import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Segmented } from "antd";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let activeValue = "overview";
  if (location.pathname.includes("/dashboard/candidates")) activeValue = "candidates";
  if (location.pathname.includes("/dashboard/settings")) activeValue = "settings";

  const handleChange = (value) => {
    if (value === "overview") navigate("/dashboard");
    else navigate(`/dashboard/${value}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "1.5rem" }}>

      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
