import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);
  const { theme } = useTheme();

  // ---------------- Row Selection ----------------
  const handleRowClick = (row: T) => {
    if (!selectable) return;
    let updatedRows: T[] = [];
    if (selectedRows.includes(row)) {
      updatedRows = selectedRows.filter((r) => r !== row);
    } else {
      updatedRows = [...selectedRows, row];
    }
    setSelectedRows(updatedRows);
    onRowSelect?.(updatedRows);
  };

  // ---------------- Sorting ----------------
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue === bValue) return 0;
      if (direction === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }, [data, sortConfig]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSortConfig((prev) => {
      if (prev?.key === col.dataIndex) {
        return { key: col.dataIndex, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key: col.dataIndex, direction: "asc" };
    });
  };

  // ---------------- Theme Classes ----------------
  const tableBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const tableText = theme === "dark" ? "text-white" : "text-gray-900";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const hoverRow = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const selectedRowBg = theme === "dark" ? "bg-blue-900" : "bg-blue-100";

  // ---------------- Render ----------------
  if (loading) return <div>Loading...</div>;
  if (data.length === 0) return <div>No data available</div>;

  return (
    <table className={`min-w-full border-collapse border ${borderColor} ${tableBg} ${tableText}`}>
      <thead>
        <tr>
          {selectable && (
            <th className={`border px-4 py-2 ${borderColor}`}>
              <input
                type="checkbox"
                checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(sortedData);
                    onRowSelect?.(sortedData);
                  } else {
                    setSelectedRows([]);
                    onRowSelect?.([]);
                  }
                }}
              />
            </th>
          )}
          {columns.map((col) => (
            <th
              key={col.key}
              className={`border px-4 py-2 cursor-pointer ${borderColor}`}
              onClick={() => handleSort(col)}
            >
              {col.title} {col.sortable ? "↕️" : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr
            key={row.id}
            className={`${selectable && selectedRows.includes(row) ? selectedRowBg : ""} ${hoverRow}`}
          >
            {selectable && (
              <td className={`border px-4 py-2 ${borderColor}`}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowClick(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className={`border px-4 py-2 ${borderColor}`}>
                {typeof row[col.dataIndex] === "object"
                  ? JSON.stringify(row[col.dataIndex])
                  : String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
