import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ConfirmModal = ({
  open,
  title = "Are you sure?",
  content = "This action cannot be undone.",
  onOk,
  onCancel,
  okText = "Yes",
  cancelText = "No",
  danger = false,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      title={
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)" }}>
          <ExclamationCircleOutlined style={{ color: danger ? "#ef4444" : "#f59e0b" }} />
          {title}
        </span>
      }
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{ danger, loading }}
      centered
      width={420}
    >
      <p style={{ color: "var(--text-secondary)" }}>{content}</p>
    </Modal>
  );
};

export default ConfirmModal;
