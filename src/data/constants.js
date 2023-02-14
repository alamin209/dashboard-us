export const AdminRoles = {
  ADMIN: "admin",
  SUPER_ADMIN: "super-admin",
};

export const actions = [
  { value: "many", label: "Delete Selected Items" },
  { value: "all", label: "Delete All" },
];

export const itemsPerPageOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export const hiddenColumnsInResponsive = {
  createdAt: "hidden md:table-cell",
  updatedAt: "hidden md:table-cell",
  email: "hidden md:table-cell",
  role: "hidden xs:table-cell",
  type: "hidden xs:table-cell",
  country: "hidden md:table-cell",
  state: "hidden md:table-cell",
  city: "hidden md:table-cell",
};
