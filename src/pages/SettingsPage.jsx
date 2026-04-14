import { useState } from "react";
import { Form, Input, Button, Switch, Typography, Divider, message, Avatar, Tag } from "antd";
import { UserOutlined, MailOutlined, BellOutlined, LockOutlined, BgColorsOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

const SettingsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });
  const [msgApi, contextHolder] = message.useMessage();

  const handleProfileSave = (values) => {
    msgApi.success("Profile settings saved (demo)");
  };

  const handlePasswordSave = (values) => {
    msgApi.success("Password changed successfully (demo)");
  };

  return (
    <div className="fade-in-up">
      {contextHolder}
      <div style={{ marginBottom: "2rem" }}>
        <Title level={3} style={{ color: "var(--text-primary)", margin: 0 }}>⚙️ Settings</Title>
        <p style={{ color: "var(--text-secondary)", marginTop: 4 }}>Manage your account and preferences</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Profile Section */}
        <div className="settings-section" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <Avatar size={72} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontSize: "1.75rem" }}>
              {user?.name?.[0]?.toUpperCase()}
            </Avatar>
            <div>
              <h3 style={{ color: "var(--text-primary)", fontWeight: 700, margin: 0 }}>{user?.name}</h3>
              <p style={{ color: "var(--text-secondary)", margin: "4px 0" }}>{user?.email}</p>
              <Tag style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
                {user?.role?.toUpperCase()}
              </Tag>
            </div>
          </div>

          <Divider style={{ borderColor: "var(--border)" }} />

          <h4 style={{ color: "var(--text-secondary)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <UserOutlined /> Profile Information
          </h4>
          <Form layout="vertical" onFinish={handleProfileSave} initialValues={{ name: user?.name, email: user?.email }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Form.Item name="name" label={<span style={{ color: "var(--text-secondary)" }}>Full Name</span>} rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item name="email" label={<span style={{ color: "var(--text-secondary)" }}>Email</span>} rules={[{ required: true, type: "email" }]}>
                <Input prefix={<MailOutlined />} />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 8 }}>
              Save Profile
            </Button>
          </Form>
        </div>

        {/* Password Section */}
        <div className="settings-section">
          <h4 style={{ color: "var(--text-secondary)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <LockOutlined /> Change Password
          </h4>
          <Form layout="vertical" onFinish={handlePasswordSave}>
            <Form.Item name="currentPassword" label={<span style={{ color: "var(--text-secondary)" }}>Current Password</span>} rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="newPassword" label={<span style={{ color: "var(--text-secondary)" }}>New Password</span>} rules={[{ required: true }, { min: 6 }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={<span style={{ color: "var(--text-secondary)" }}>Confirm New Password</span>}
              dependencies={["newPassword"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({ validator: (_, v) => (!v || getFieldValue("newPassword") === v) ? Promise.resolve() : Promise.reject("Passwords don't match") }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" danger style={{ borderRadius: 8 }}>
              Update Password
            </Button>
          </Form>
        </div>


      </div>
    </div>
  );
};

export default SettingsPage;
