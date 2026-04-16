import { useCallback, useMemo, useRef } from "react";
import { Avatar, Dropdown, Button } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { ColumnsToolPanelModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([AllCommunityModule, ColumnsToolPanelModule]);

// Removed StatusCellRenderer to display status as plain normal text as requested.

const AgGridTable = ({
  rowData,
  columnDefs,
  onEdit,
  onDelete,
  onGridReady,
  onSelectionChanged,
  onColumnChanged,
  paginationPageSize = 10,
  gridId = "defaultGrid",
  enableCheckboxes = true,
  ...props
}) => {
  const gridRef = useRef();

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    minWidth: 10,
    ...props.defaultColDef,
  }), [props.defaultColDef]);

  const internalOnGridReady = useCallback((params) => {
    gridRef.current = params;
    // Set autoHeight by default
    params.api.setGridOption("domLayout", "autoHeight");

    // Restoration of state logic moved to parent or handled here?
    // Let's keep it flexible
    if (onGridReady) onGridReady(params);
  }, [onGridReady]);

  const themeClass = props.theme || "ag-theme-alpine";

  const rowSelectionConfig = enableCheckboxes ? {
    mode: "multiRow",
    headerCheckbox: true,
    checkboxes: true,
    enableClickSelection: false,
  } : undefined;

  const selectionColumnDef = useMemo(() => ({
    pinned: "left",
    width: 20,
    suppressSizeToFit: false,
  }), []);

  const autoSizeStrategy = useMemo(() => ({
    type: "fitCellContents"
  }), []);

  const defaultColumns = useMemo(() => [
    {
      field: "name",
      headerName: "Name",
      pinned: "left",
      minWidth: 100,
      valueGetter: (p) => `${p.data.firstName || ""} ${p.data.lastName || ""}`.trim(),
      cellRenderer: (p) => {
        const initial = p.data.firstName?.[0]?.toUpperCase() || "U";
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar size={32} style={{ background: "var(--primary)", color: "#fff", flexShrink: 0 }}>
              {initial}
            </Avatar>
            <span style={{ fontWeight: 600, color: "var(--primary)", fontSize: 13 }}>{p.value}</span>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      cellRenderer: (p) => <span style={{ color: "var(--text-secondary)" }}>{p.value}</span>
    },
    { field: "role", headerName: "Role", minWidth: 150 },
    { field: "status", headerName: "Status", minWidth: 120 },
    { field: "experience", headerName: "Experience", minWidth: 110, valueFormatter: (p) => `${p.value} yrs` },
    { field: "location", headerName: "Country", minWidth: 130 },
    {
      field: "actions",
      headerName: "Actions",
      pinned: "right",
      minWidth: 50,
      sortable: false,
      filter: false,
      cellRenderer: (p) => {
        const items = [];
        if (onEdit) items.push({ key: "edit", label: "Edit", icon: <EditOutlined />, onClick: () => onEdit(p.data) });
        if (onDelete) items.push({ key: "delete", label: <span style={{ color: "#ef4444" }}>Delete</span>, icon: <DeleteOutlined style={{ color: "#ef4444" }} />, onClick: () => onDelete(p.data) });

        if (items.length === 0) return null;

        return (
          <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
              <Button type="text" icon={<MoreOutlined style={{ fontSize: 18, color: "var(--text-secondary)" }} />} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }} />
            </Dropdown>
          </div>
        );
      },
    },
  ], [onEdit, onDelete]);

  return (
    <div id={gridId} className={themeClass} style={{ width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs || defaultColumns}
        onGridReady={internalOnGridReady}
        onColumnVisible={onColumnChanged}
        onColumnResized={onColumnChanged}
        onColumnMoved={onColumnChanged}
        domLayout="autoHeight"
        rowSelection={rowSelectionConfig}
        selectionColumnDef={selectionColumnDef}
        autoSizeStrategy={autoSizeStrategy}
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[5, 10, 20, 50]}
        onSelectionChanged={onSelectionChanged}
        defaultColDef={defaultColDef}
        sideBar={{ toolPanels: ["columns"] }}
        rowHeight={45}
        headerHeight={48}
        {...props}
      />
    </div>
  );
};

export default AgGridTable;
