import { useState, useEffect } from "react";
import { Modal, Form, Input, Select, InputNumber, Row, Col, Button, Typography, Divider } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import ConfirmModal from "../ui/ConfirmModal";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const JobApplicationForm = ({ open, onClose, onSubmit, job, loading }) => {
  const [form] = Form.useForm();

  const [isDirty, setIsDirty] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (open) {
      setIsDirty(false);
    } else {
      form.resetFields();
      setIsDirty(false);
    }
  }, [open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      setIsDirty(false);
    } catch (_) {}
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      title={
        <div>
          <Title level={4} style={{ color: "var(--text-primary)", margin: 0 }}>
            Apply for: {job?.title}
          </Title>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "4px 0 0" }}>
            {job?.company} · {job?.location}
          </p>
        </div>
      }
      onCancel={handleCancel}
      width={680}
      centered
      footer={[
        <Button key="cancel" onClick={handleCancel} style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none" }}
        >
          Submit Application
        </Button>,
      ]}
      destroyOnClose
    >
      <Form 
        form={form} 
        layout="vertical" 
        onValuesChange={() => setIsDirty(true)}
        style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: 8 }}
      >
        <Divider orientation="left" style={{ color: "var(--text-secondary)", fontSize: "0.8rem", borderColor: "var(--border)" }}>
          Personal Information
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label={<span style={{ color: "var(--text-secondary)" }}>First Name <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="John" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label={<span style={{ color: "var(--text-secondary)" }}>Last Name <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label={<span style={{ color: "var(--text-secondary)" }}>Email <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[
                { required: true, message: "Email is required" },
                {
                  validator: (_, val) => {
                    if (!val) return Promise.resolve();
                    if (!EMAIL_REGEX.test(val))
                      return Promise.reject("Enter a valid email (e.g. name@domain.com)");
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="john@example.com" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label={<span style={{ color: "var(--text-secondary)" }}>Phone <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[
                { required: true, message: "Phone is required" },
                { pattern: /^[\d\s\+\-\(\)]{7,15}$/, message: "Enter a valid phone number" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="+1 234 567 8900" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" style={{ color: "var(--text-secondary)", fontSize: "0.8rem", borderColor: "var(--border)" }}>
          Professional Details
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label={<span style={{ color: "var(--text-secondary)" }}>Applying for Role <span style={{ color: "#ef4444" }}>*</span></span>}
              initialValue={job?.title}
              rules={[{ required: true, message: "Role is required" }]}
            >
              <Input placeholder={job?.title} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="department"
              label={<span style={{ color: "var(--text-secondary)" }}>Department <span style={{ color: "#ef4444" }}>*</span></span>}
              initialValue={job?.department}
              rules={[{ required: true, message: "Department is required" }]}
            >
              <Input placeholder={job?.department} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="experience"
              label={<span style={{ color: "var(--text-secondary)" }}>Years of Experience <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber min={0} max={50} style={{ width: "100%" }} placeholder="3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="location"
              label={<span style={{ color: "var(--text-secondary)" }}>Your Location <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Location is required" }]}
            >
              <Input placeholder="New York, USA" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="skills"
          label={<span style={{ color: "var(--text-secondary)" }}>Skills</span>}
        >
          <Select mode="tags" placeholder="Add your skills">
            {(job?.skills || []).map((s) => <Option key={s} value={s}>{s}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          name="notes"
          label={<span style={{ color: "var(--text-secondary)" }}>Cover Letter / Notes</span>}
        >
          <TextArea rows={3} placeholder="Tell us why you're a great fit..." />
        </Form.Item>
      </Form>

      <ConfirmModal
        open={showCancelConfirm}
        title="Discard Application?"
        content="You have unsaved changes. Are you sure you want to discard your job application?"
        onOk={() => { setShowCancelConfirm(false); onClose(); }}
        onCancel={() => setShowCancelConfirm(false)}
        okText="Discard"
        danger
      />
    </Modal>
  );
};

export default JobApplicationForm;
