import { useState } from "react";
import { Form, Input, Button, Typography, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, RocketOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "10%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.05)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(139,92,246,0.05)", filter: "blur(80px)" }} />

      <div className="auth-form-container fade-in-up">
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.5rem" }}>
            <RocketOutlined style={{ color: "white" }} />
          </div>
          <Title level={3} style={{ color: "var(--text-primary)", margin: 0 }}>Welcome Back</Title>
          <Text style={{ color: "var(--text-secondary)" }}>Sign in to your TalentFlow account</Text>
        </div>

        {error && <Alert description={error} type="error" showIcon style={{ marginBottom: "1.5rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10 }} />}

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            label={<span style={{ color: "var(--text-secondary)" }}>Email <span style={{ color: "#ef4444" }}>*</span></span>}
            rules={[
              { required: true, message: "Email is required" },
              { validator: (_, val) => (!val || EMAIL_REGEX.test(val)) ? Promise.resolve() : Promise.reject("Enter a valid email (e.g. name@domain.com)") },
            ]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: "var(--text-secondary)" }}>Password <span style={{ color: "#ef4444" }}>*</span></span>}
            rules={[{ required: true, message: "Password is required" }, { min: 6, message: "Min 6 characters" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="••••••••"
              iconRender={(visible) => visible ? <EyeTwoTone twoToneColor="#6366f1" /> : <EyeInvisibleOutlined />}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 10, height: 48, fontWeight: 700, marginTop: "0.5rem" }}
          >
            Sign In
          </Button>
          <Button
            size="large"
            block
            onClick={() => navigate("/")}
            style={{ marginTop: "0.5rem", borderRadius: 10, height: 48, fontWeight: 600 }}
          >
            Cancel
          </Button>
        </Form>

        <Divider style={{ borderColor: "var(--border)", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
          or
        </Divider>

        <p style={{ textAlign: "center", color: "var(--text-secondary)", margin: 0 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary-light)", fontWeight: 600 }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
