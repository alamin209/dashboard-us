export const SheetTableHead = [
  { label: "", accessor: "checkbox" },
  { label: "Sheet Name", accessor: "name" },
  { label: "Admin", accessor: "admin" },
  { label: "Created At", accessor: "createdAt" },
  { label: "Updated At", accessor: "updatedAt" },
  { label: "", accessor: "actions" },
];

export const SheetFilters = [
  {
    label: "Admin",
    accessor: "admin",
    type: "select",
    isSearchable: true,
    options: [],
  },
];
