import { useState } from "react";
import { Form, Input, Button, Typography, Divider, Alert } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, RocketOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    try {
      await register(values.name, values.email, values.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div style={{ position: "absolute", top: "10%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.05)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(139,92,246,0.05)", filter: "blur(80px)" }} />

      <div className="auth-form-container fade-in-up">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.5rem" }}>
            <RocketOutlined style={{ color: "white" }} />
          </div>
          <Title level={3} style={{ color: "var(--text-primary)", margin: 0 }}>Create Account</Title>
          <Text style={{ color: "var(--text-secondary)" }}>Join TalentFlow for free</Text>
        </div>

        {error && <Alert description={error} type="error" showIcon style={{ marginBottom: "1.5rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10 }} />}

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label={<span style={{ color: "var(--text-secondary)" }}>Full Name <span style={{ color: "#ef4444" }}>*</span></span>}
            rules={[{ required: true, message: "Name is required" }, { min: 2, message: "Min 2 characters" }]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>

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
              iconRender={(v) => v ? <EyeTwoTone twoToneColor="#6366f1" /> : <EyeInvisibleOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<span style={{ color: "var(--text-secondary)" }}>Confirm Password <span style={{ color: "#ef4444" }}>*</span></span>}
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator: (_, val) => (!val || getFieldValue("password") === val) ? Promise.resolve() : Promise.reject("Passwords do not match"),
              }),
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••" iconRender={(v) => v ? <EyeTwoTone twoToneColor="#6366f1" /> : <EyeInvisibleOutlined />} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 10, height: 48, fontWeight: 700, marginTop: "0.5rem" }}
          >
            Create Account
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

        <Divider style={{ borderColor: "var(--border)", color: "var(--text-secondary)", fontSize: "0.8rem" }}>or</Divider>

        <p style={{ textAlign: "center", color: "var(--text-secondary)", margin: 0 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary-light)", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
