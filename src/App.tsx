import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable, Column } from "./components/DataTable/DataTable";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; 

interface User {
  id: number;
  name: string;
  age: number;
}

function AppContent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const { theme, toggleTheme } = useTheme();

  const sampleData: User[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 28 },
  ];

  const columns: Column<User>[] = [
    { key: "id", title: "ID", dataIndex: "id", sortable: true },
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  const appBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";

  return (
    <div className={`p-6 max-w-4xl mx-auto space-y-10 min-h-screen ${appBg}`}>
      {/* ---------------- Theme Toggle ---------------- */}
      <div className="flex justify-end">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-gray-500 text-white"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* ---------------- InputField Examples ---------------- */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">InputField Component</h2>

        <InputField
          label="Name (Outlined)"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="Type your full name"
          errorMessage={name.length > 10 ? "Name too long!" : ""}
          invalid={name.length > 10}
          variant="outlined"
          size="md"
          clearable
        />

        <InputField
          label="Password (Filled)"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Password must be 6+ characters"
          errorMessage={
            password.length > 0 && password.length < 6 ? "Too short!" : ""
          }
          invalid={password.length > 0 && password.length < 6}
          variant="filled"
          size="md"
          clearable
        />

        <InputField
          label="Email (Ghost, Small)"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="ghost"
          size="sm"
          helperText="Small input example"
        />

        <InputField
          label="Disabled Input (Large)"
          placeholder="Cannot type here"
          disabled
          variant="outlined"
          size="lg"
        />
      </div>

      {/* ---------------- DataTable Example ---------------- */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">DataTable Component</h2>

        <button
          className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setLoading(!loading)}
        >
          {loading ? "Stop Loading" : "Start Loading"}
        </button>

        <DataTable<User>
          data={sampleData}
          columns={columns}
          selectable
          loading={loading}
          onRowSelect={setSelectedRows}
        />

        {selectedRows.length > 0 && (
          <div className="text-gray-700 mt-2">
            Selected Users: {selectedRows.map((u) => u.name).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- Wrap App with ThemeProvider ----------------
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
