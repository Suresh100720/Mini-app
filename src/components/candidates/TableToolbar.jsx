import { Button, Input, Space, Tooltip, Badge } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExportOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const TableToolbar = ({
  title,
  selectedCount,
  onAdd,
  onDeleteSelected,
  onExport,
  onRefresh,
  onSearch,
  searchValue,
  extraActions,
}) => {
  return (
    <div className="table-toolbar">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <h3 style={{ color: "var(--text-primary)", fontWeight: 700, margin: 0 }}>{title}</h3>
        {selectedCount > 0 && (
          <Badge
            count={selectedCount}
            style={{ background: "var(--primary)" }}
          />
        )}
      </div>

      <Space wrap>
        {onSearch && (
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: "var(--text-secondary)" }} />}
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text-primary)",
              width: 200,
            }}
          />
        )}

        {selectedCount > 0 && onDeleteSelected && (
          <Tooltip title={`Delete ${selectedCount} selected`}>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={onDeleteSelected}
              style={{ borderRadius: 8 }}
            >
              Delete ({selectedCount})
            </Button>
          </Tooltip>
        )}

        {onExport && (
          <Tooltip title="Export CSV">
            <Button
              icon={<ExportOutlined />}
              onClick={onExport}
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid var(--border)",
                color: "var(--primary-light)",
                borderRadius: 8,
              }}
            >
              Export
            </Button>
          </Tooltip>
        )}

        {onRefresh && (
          <Tooltip title="Refresh">
            <Button
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                borderRadius: 8,
              }}
            />
          </Tooltip>
        )}

        {extraActions}

        {onAdd && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAdd}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Add Candidate
          </Button>
        )}
      </Space>
    </div>
  );
};

export default TableToolbar;
