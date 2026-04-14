import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Button, Modal, message, Typography, Tooltip, Avatar, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useCandidates } from "../context/CandidateContext";
import StatCards from "../components/ui/StatCards";
import AgGridTable from "../components/ui/AgGridTable";
import TableToolbar from "../components/candidates/TableToolbar";
import CandidateForm from "../components/candidates/CandidateForm";
import ConfirmModal from "../components/ui/ConfirmModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {
  StatusPieChart,
  DepartmentBarChart,
  TrendAreaChart,
  SkillsRadarChart,
} from "../components/dashboard/DashboardCharts";

const { Title } = Typography;

const STAT_CARDS = [
  { key: "all", label: "Total Candidates", icon: "👥", color: "#6366f1", filter: null },
  { key: "Hired", label: "Hired", icon: "✅", color: "#10b981", filter: "Hired" },
  { key: "Interview", label: "In Interview", icon: "🎤", color: "#f59e0b", filter: "Interview" },
  { key: "Offered", label: "Offered", icon: "📋", color: "#06b6d4", filter: "Offered" },
  { key: "Rejected", label: "Rejected", icon: "❌", color: "#ef4444", filter: "Rejected" },
];

const DashboardPage = () => {
  const { candidates, stats, loading, fetchCandidates, fetchStats, addCandidate, updateCandidate, deleteCandidate, deleteBulk } = useCandidates();
  const [activeCard, setActiveCard] = useState("all");
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const gridRef = useRef();
  const modalGridRef = useRef();
  const [search, setSearch] = useState("");
  const [msgApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchCandidates();
    fetchStats();
  }, []);

  const filteredCandidates = useMemo(() => {
    let list = candidates;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.role?.toLowerCase().includes(q) ||
          c.department?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [candidates, search]);

  const modalFilteredCandidates = useMemo(() => {
    if (activeCard === "all" || activeCard === "total") return candidates;
    if (activeCard === "applied") return candidates.filter(c => c.status === "Applied");
    return candidates.filter(c => c.status === activeCard || c.status?.toLowerCase() === activeCard.toLowerCase());
  }, [candidates, activeCard]);

  const handleStatCardClick = (key) => {
    setActiveCard(key);
    setStatModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (editingCandidate) {
        await updateCandidate(editingCandidate._id, values);
        msgApi.success("Candidate updated successfully");
      } else {
        await addCandidate(values);
        msgApi.success("Candidate added successfully");
      }
      setFormOpen(false);
      setEditingCandidate(null);
    } catch (err) {
      msgApi.error(err.response?.data?.message || "Operation failed");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCandidate(deleteTarget._id);
      msgApi.success("Candidate deleted");
      setDeleteTarget(null);
    } catch (err) {
      msgApi.error("Delete failed");
    }
  };

  const handleBulkDelete = async () => {
    try {
      await deleteBulk(selectedRows.map((r) => r._id));
      msgApi.success(`${selectedRows.length} candidates deleted`);
      setBulkDeleteOpen(false);
      setSelectedRows([]);
    } catch (err) {
      msgApi.error("Bulk delete failed");
    }
  };

  const handleExport = useCallback(() => {
    if (!gridRef.current?.api) return;
    gridRef.current.api.exportDataAsCsv({ fileName: "candidates.csv" });
  }, []);

  const getStatValue = (key) => {
    if (!stats) return 0;
    if (key === "all") return stats.total;
    return stats[key === "Interview" ? "inInterview" : key.toLowerCase()] ?? 0;
  };

  if (loading && candidates.length === 0) return <LoadingSpinner fullscreen tip="Loading dashboard..." />;

  return (
    <div className="fade-in-up">
      {contextHolder}
      <div style={{ marginBottom: "1.5rem" }}>
        <Title level={3} style={{ color: "var(--text-primary)", margin: 0 }}>📊 Dashboard</Title>
        <p style={{ color: "var(--text-secondary)", margin: "4px 0 0" }}>Overview of your hiring pipeline</p>
      </div>

      {/* Stat Cards Row */}
      <StatCards 
        data={candidates} 
        appliedCount={stats?.applied || 0} 
        onCardClick={handleStatCardClick} 
      />

      {/* Charts Row */}
      <div className="charts-grid">
        <StatusPieChart data={stats?.byStatus} />
        <DepartmentBarChart data={stats?.byDepartment} />
        <TrendAreaChart />
        <SkillsRadarChart />
      </div>

      {/* Candidates Table */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <TableToolbar
          title="All Candidates"
          selectedCount={selectedRows.length}
          onAdd={() => { setEditingCandidate(null); setFormOpen(true); }}
          onDeleteSelected={() => setBulkDeleteOpen(true)}
          onExport={handleExport}
          onRefresh={() => { fetchCandidates(); fetchStats(); }}
          onSearch={setSearch}
          searchValue={search}
        />
        <AgGridTable
          gridId="dashboardGrid"
          rowData={filteredCandidates}
          onEdit={(data) => { setEditingCandidate(data); setFormOpen(true); }}
          onDelete={(data) => setDeleteTarget(data)}
          onGridReady={(p) => { gridRef.current = p; }}
          onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
          paginationPageSize={10}
        />
      </div>

      {/* Candidate Form Modal */}
      <CandidateForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingCandidate(null); }}
        onSubmit={handleFormSubmit}
        initialData={editingCandidate}
        loading={formLoading}
      />

      {/* Delete Confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Candidate"
        content={`Are you sure you want to delete ${deleteTarget?.firstName} ${deleteTarget?.lastName}? This action cannot be undone.`}
        danger
        onOk={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        okText="Delete"
      />

      <ConfirmModal
        open={bulkDeleteOpen}
        title="Delete Selected Candidates"
        content={`Are you sure you want to delete ${selectedRows.length} selected candidates?`}
        danger
        onOk={handleBulkDelete}
        onCancel={() => setBulkDeleteOpen(false)}
        okText="Delete All"
      />

      <Modal
        open={statModalOpen}
        onCancel={() => setStatModalOpen(false)}
        footer={null}
        width={1000}
        title={<span style={{ textTransform: "capitalize", fontSize: "1.2rem" }}>{activeCard} Candidates</span>}
        destroyOnClose
      >
        <div style={{ marginTop: 20 }}>
          <AgGridTable
            gridId="modalGrid"
            rowData={modalFilteredCandidates}
            onGridReady={(p) => { modalGridRef.current = p; }}
            paginationPageSize={10}
            enableCheckboxes={false}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
