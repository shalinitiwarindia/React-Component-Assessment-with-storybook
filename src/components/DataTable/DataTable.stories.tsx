
import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5";
import { DataTable, DataTableProps, Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

export default {
  title: "Components/DataTable",
  component: DataTable,
} as Meta;

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

const Template: StoryFn<DataTableProps<User>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  return (
    <div>
      <DataTable<User> {...args} onRowSelect={setSelectedRows} />
      {selectedRows.length > 0 && (
        <p>Selected Users: {selectedRows.map((u) => u.name).join(", ")}</p>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  columns,
  selectable: true,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: sampleData,
  columns,
  selectable: true,
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  columns,
  selectable: true,
  loading: false,
};
