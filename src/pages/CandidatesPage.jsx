import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Button, message, Typography, Tooltip, Avatar, Tag, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useCandidates } from "../context/CandidateContext";
import AgGridTable from "../components/ui/AgGridTable";
import TableToolbar from "../components/candidates/TableToolbar";
import CandidateForm from "../components/candidates/CandidateForm";
import ConfirmModal from "../components/ui/ConfirmModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const { Title } = Typography;

const CandidatesPage = () => {
  const { candidates, loading, error, fetchCandidates, addCandidate, updateCandidate, deleteCandidate, deleteBulk } = useCandidates();
  const [selectedRows, setSelectedRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [search, setSearch] = useState("");
  const gridRef = useRef();
  const [msgApi, contextHolder] = message.useMessage();

  useEffect(() => { fetchCandidates(); }, []);

  const filteredCandidates = useMemo(() => {
    if (!search) return candidates;
    const q = search.toLowerCase();
    return candidates.filter(
      (c) =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.role?.toLowerCase().includes(q) ||
        c.department?.toLowerCase().includes(q) ||
        c.status?.toLowerCase().includes(q)
    );
  }, [candidates, search]);

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (editingCandidate) {
        await updateCandidate(editingCandidate._id, values);
        msgApi.success("✅ Candidate updated!");
      } else {
        await addCandidate(values);
        msgApi.success("✅ Candidate added!");
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
    if (gridRef.current?.api) gridRef.current.api.exportDataAsCsv({ fileName: "candidates_export.csv" });
  }, []);

  if (loading && candidates.length === 0) return <LoadingSpinner tip="Loading candidates..." />;

  return (
    <div className="fade-in-up">
      {contextHolder}

      <div style={{ marginBottom: "1.5rem" }}>
        <Title level={3} style={{ color: "var(--text-primary)", margin: 0 }}>👥 Candidates</Title>
        <p style={{ color: "var(--text-secondary)", margin: "4px 0 0" }}>
          Manage all {candidates.length} candidates in your pipeline
        </p>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", color: "#f87171" }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <TableToolbar
          title="All Candidates"
          selectedCount={selectedRows.length}
          onAdd={() => { setEditingCandidate(null); setFormOpen(true); }}
          onDeleteSelected={() => setBulkDeleteOpen(true)}
          onExport={handleExport}
          onRefresh={() => fetchCandidates()}
          onSearch={setSearch}
          searchValue={search}
        />
        <AgGridTable
          gridId="candidatesGrid"
          rowData={filteredCandidates}
          onEdit={(data) => { setEditingCandidate(data); setFormOpen(true); }}
          onDelete={(data) => setDeleteTarget(data)}
          onGridReady={(p) => { gridRef.current = p; }}
          onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
          paginationPageSize={10}
        />
      </div>

      <CandidateForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingCandidate(null); }}
        onSubmit={handleFormSubmit}
        initialData={editingCandidate}
        loading={formLoading}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Candidate"
        content={`Delete ${deleteTarget?.firstName} ${deleteTarget?.lastName}? This cannot be undone.`}
        danger
        onOk={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        okText="Delete"
      />

      <ConfirmModal
        open={bulkDeleteOpen}
        title="Delete Selected Candidates"
        content={`Delete ${selectedRows.length} selected candidates? This cannot be undone.`}
        danger
        onOk={handleBulkDelete}
        onCancel={() => setBulkDeleteOpen(false)}
        okText="Delete All"
      />
    </div>
  );
};

export default CandidatesPage;
