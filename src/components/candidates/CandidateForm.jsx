import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
  Button,
  Typography,
  Divider,
  message,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import ConfirmModal from "../ui/ConfirmModal";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Design", "Operations", "Product"];
const STATUSES = ["Applied", "Active", "Inactive", "Screening", "Interview", "Offered", "Hired", "Rejected"];
const SKILLS_OPTIONS = ["React", "Node.js", "Python", "Java", "SQL", "MongoDB", "TypeScript", "AWS", "Docker", "Kubernetes", "Git", "REST API"];

const CandidateForm = ({ open, onClose, onSubmit, initialData, loading }) => {
  const [form] = Form.useForm();
  const [isDirty, setIsDirty] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const initialValues = useRef(null);

  const isEditing = !!initialData?._id;

  useEffect(() => {
    if (open) {
      const values = initialData
        ? {
            firstName: initialData.firstName,
            lastName: initialData.lastName,
            email: initialData.email,
            phone: initialData.phone,
            role: initialData.role,
            department: initialData.department,
            experience: initialData.experience,
            status: initialData.status,
            skills: initialData.skills || [],
            location: initialData.location,
            salary: initialData.salary,
            notes: initialData.notes,
          }
        : { status: "Applied", experience: 0 };
      form.setFieldsValue(values);
      initialValues.current = values;
      setIsDirty(false);
    } else {
      form.resetFields();
      setIsDirty(false);
    }
  }, [open, initialData, form]);

  const checkDirty = (_, allValues) => {
    if (!initialValues.current) { setIsDirty(true); return; }
    const changed = JSON.stringify(allValues) !== JSON.stringify(initialValues.current);
    setIsDirty(changed);
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      setIsDirty(false);
    } catch (err) {
      // Form validation error – do nothing (form shows error)
    }
  };

  return (
    <>
      <Modal
        open={open}
        title={
          <Title level={4} style={{ color: "var(--text-primary)", margin: 0 }}>
            {isEditing ? "✏️ Edit Candidate" : "➕ Add New Candidate"}
          </Title>
        }
        onCancel={handleCancel}
        width={720}
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
            {isEditing ? "Update Candidate" : "Add Candidate"}
          </Button>,
        ]}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={checkDirty}
          style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: 8 }}
        >
          <Divider orientation="left" style={{ color: "var(--text-secondary)", fontSize: "0.8rem", borderColor: "var(--border)" }}>
            Personal Information
          </Divider>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="firstName"
                label={<span style={{ color: "var(--text-secondary)" }}>First Name <span style={{ color: "#ef4444" }}>*</span></span>}
                rules={[{ required: true, message: "First name is required" }, { min: 2, message: "Min 2 characters" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="John" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label={<span style={{ color: "var(--text-secondary)" }}>Email <span style={{ color: "#ef4444" }}>*</span></span>}
                rules={[
                  { required: true, message: "Email is required" },
                  {
                    validator: (_, val) => {
                      if (!val) return Promise.resolve();
                      if (!EMAIL_REGEX.test(val))
                        return Promise.reject(`Enter a valid email (e.g. name@domain.com)`);
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="john@example.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
              <Form.Item
                name="role"
                label={<span style={{ color: "var(--text-secondary)" }}>Role / Position <span style={{ color: "#ef4444" }}>*</span></span>}
                rules={[{ required: true, message: "Role is required" }]}
              >
                <Input placeholder="e.g. Frontend Developer" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="department"
                label={<span style={{ color: "var(--text-secondary)" }}>Department <span style={{ color: "#ef4444" }}>*</span></span>}
                rules={[{ required: true, message: "Department is required" }]}
              >
                <Select placeholder="Select department">
                  {DEPARTMENTS.map((d) => <Option key={d} value={d}>{d}</Option>)}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="experience"
                label={<span style={{ color: "var(--text-secondary)" }}>Experience (years) <span style={{ color: "#ef4444" }}>*</span></span>}
                rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber min={0} max={50} style={{ width: "100%" }} placeholder="3" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="status"
                label={<span style={{ color: "var(--text-secondary)" }}>Status <span style={{ color: "#ef4444" }}>*</span></span>}
                rules={[{ required: true, message: "Status is required" }]}
              >
                <Select placeholder="Select status">
                  {STATUSES.map((s) => <Option key={s} value={s}>{s}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="salary"
                label={<span style={{ color: "var(--text-secondary)" }}>Expected Salary ($)</span>}
              >
                <InputNumber min={0} style={{ width: "100%" }} placeholder="75000" formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="skills"
                label={<span style={{ color: "var(--text-secondary)" }}>Skills</span>}
              >
                <Select mode="tags" placeholder="Add skills (type and press Enter)">
                  {SKILLS_OPTIONS.map((s) => <Option key={s} value={s}>{s}</Option>)}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="location"
                label={<span style={{ color: "var(--text-secondary)" }}>Location</span>}
              >
                <Input placeholder="New York, USA" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="notes"
            label={<span style={{ color: "var(--text-secondary)" }}>Notes</span>}
          >
            <TextArea rows={3} placeholder="Additional notes about the candidate..." />
          </Form.Item>
        </Form>
      </Modal>

      <ConfirmModal
        open={showCancelConfirm}
        title="Discard Changes?"
        content="You have unsaved changes. Are you sure you want to discard them?"
        onOk={() => { setShowCancelConfirm(false); onClose(); }}
        onCancel={() => setShowCancelConfirm(false)}
        okText="Discard"
        danger
      />
    </>
  );
};

export default CandidateForm;
