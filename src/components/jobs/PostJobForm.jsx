import { Modal, Form, Input, Select, Button, Typography, Row, Col, Divider } from "antd";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const PostJobForm = ({ open, onClose, onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (_) {}
  };

  return (
    <Modal
      open={open}
      title={
        <Title level={4} style={{ color: "var(--text-primary)", margin: 0 }}>
          📢 Post a New Job
        </Title>
      }
      onCancel={onClose}
      width={700}
      centered
      footer={[
        <Button key="cancel" onClick={onClose} style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none" }}
        >
          Post Job
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: 8 }}>
        <Divider orientation="left" style={{ color: "var(--text-secondary)", fontSize: "0.8rem", borderColor: "var(--border)" }}>
          Basic Information
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label={<span style={{ color: "var(--text-secondary)" }}>Job Title / Role Name <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Job title is required" }]}
            >
              <Input placeholder="e.g. Senior Frontend Developer" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="company"
              label={<span style={{ color: "var(--text-secondary)" }}>Company <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Company is required" }]}
            >
              <Input placeholder="TechCorp Inc." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="department"
              label={<span style={{ color: "var(--text-secondary)" }}>Department <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Department is required" }]}
            >
              <Input placeholder="e.g. Engineering" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="location"
              label={<span style={{ color: "var(--text-secondary)" }}>Location / Country <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Location is required" }]}
            >
              <Input placeholder="e.g. Remote, USA" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" style={{ color: "var(--text-secondary)", fontSize: "0.8rem", borderColor: "var(--border)" }}>
          Role Details
        </Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="type"
              label={<span style={{ color: "var(--text-secondary)" }}>Job Type <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Job type is required" }]}
            >
              <Select placeholder="Select type">
                {JOB_TYPES.map((t) => <Option key={t} value={t}>{t}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="experience"
              label={<span style={{ color: "var(--text-secondary)" }}>Experience <span style={{ color: "#ef4444" }}>*</span></span>}
              rules={[{ required: true, message: "Experience is required" }]}
            >
              <Input placeholder="e.g. 3-5 years" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="salary"
              label={<span style={{ color: "var(--text-secondary)" }}>Salary Range</span>}
            >
              <Input placeholder="e.g. $80K - $120K" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="skills"
          label={<span style={{ color: "var(--text-secondary)" }}>Required Skills</span>}
        >
          <Select mode="tags" placeholder="Add skills needed (type and press Enter)">
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label={<span style={{ color: "var(--text-secondary)" }}>Job Description <span style={{ color: "#ef4444" }}>*</span></span>}
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea rows={4} placeholder="Describe the role and responsibilities..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostJobForm;
