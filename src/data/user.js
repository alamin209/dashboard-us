export const UserTableHead = [
  { label: "", accessor: "checkbox" },
  { label: "First Name", accessor: "firstName" },
  { label: "Last Name", accessor: "lastName" },
  { label: "Email", accessor: "email" },
  { label: "Type", accessor: "type" },
  { label: "Country", accessor: "country" },
  { label: "State", accessor: "state" },
  { label: "City", accessor: "city" },
  { label: "", accessor: "actions" },
];

export const TypesSelectOptions = [
  { value: "PUBLIC", label: "PUBLIC" },
  { value: "DISTRIBUTOR", label: "DISTRIBUTOR" },
  { value: "SPONSOR", label: "SPONSOR" },
];

export const UserFilters = [
  { label: "First Name", accessor: "firstName", type: "text" },
  { label: "Last Name", accessor: "lastName", type: "text" },
  { label: "Email", accessor: "email", type: "email" },
  {
    label: "Country",
    accessor: "country",
    type: "select",
    isSearchable: true,
    options: [],
  },
  {
    label: "State",
    accessor: "state",
    type: "select",
    isSearchable: true,
    options: [],
  },
  {
    label: "City",
    accessor: "city",
    type: "select",
    isSearchable: true,
    options: [],
  },
  {
    label: "Type",
    accessor: "type",
    type: "select",
    isSearchable: false,
    options: TypesSelectOptions,
  },
];

export const UserInputs = {
  "personal-info": [
    { label: "First Name", accessor: "firstName", type: "text" },
    { label: "Middle Name", accessor: "middleName", type: "text" },
    { label: "Last Name", accessor: "lastName", type: "text" },
    { label: "Email", accessor: "email", type: "email" },
    { label: "Company", accessor: "company", type: "text" },
    {
      label: "Type",
      accessor: "type",
      type: "select",
      isSearchable: false,
      options: TypesSelectOptions,
    },
  ],
  "geographical-info": [
    { label: "Address One", accessor: "addressOne", type: "text" },
    { label: "Address Two", accessor: "addressTwo", type: "text" },
    {
      label: "Country",
      accessor: "country",
      type: "select",
      isSearchable: true,
      options: [],
    },
    {
      label: "State",
      accessor: "state",
      type: "select",
      isSearchable: true,
      options: [],
    },
    {
      label: "City",
      accessor: "city",
      type: "select",
      isSearchable: true,
      options: [],
    },
    { label: "Zip Code", accessor: "zipCode", type: "text" },
  ],
  password: [{ label: "Password", accessor: "password", type: "password" }],
};

export const UsersDeletedFields = [
  "createdAt",
  "updatedAt",
  "_id",
  "__v",
  "securityQuestions",
];
