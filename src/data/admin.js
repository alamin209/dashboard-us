export const AdminTableHead = [
  { label: "", accessor: "checkbox" },
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Role", accessor: "role" },
  { label: "Created At", accessor: "createdAt" },
  { label: "Updated At", accessor: "updatedAt" },
  { label: "", accessor: "actions" },
];

export const RolesSelectOptions = [
  { value: "admin", label: "Admin" },
  { value: "super-admin", label: "Super Admin" },
];

export const AdminFilters = [
  {
    label: "Role",
    accessor: "role",
    type: "select",
    isSearchable: false,
    options: RolesSelectOptions,
  },
  { label: "Name", accessor: "name", type: "text" },
  { label: "Email", accessor: "email", type: "text" },
];

export const AdminInputs = {
  "personal-info": [
    { label: "Name", accessor: "name", type: "text" },
    { label: "Email", accessor: "email", type: "email" },
    {
      label: "Role",
      accessor: "role",
      type: "select",
      isSearchable: false,
      options: RolesSelectOptions,
    },
  ],
  password: [{ label: "Password", accessor: "password", type: "password" }],
};

export const AdminsDeletedFields = ["createdAt", "updatedAt", "_id", "__v"];
