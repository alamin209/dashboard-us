export const CategoryTableHead = [
  { label: "", accessor: "checkbox" },
  { label: "Category", accessor: "name" },
  { label: "Subcategory", accessor: "details" },
  { label: "Image", accessor: "feature_image" },
  { label: "Status", accessor: "status" },
  { label: "", accessor: "actions" },
];

export const TypesSelectOptions = [
  { value: "Category", label: "Category" },
  { value: "Subcategory", label: "Subcategory" },
];

export const CategoryInputs = {
  Name: [{ label: "Name", accessor: "name", type: "text" }],
  Details: [{ label: "Details", accessor: "details", type: "textArea" }],
  Image: [{ label: "Image", accessor: "feature_image", type: "file" }],
  Icon: [{ label: "Icon", accessor: "icon", type: "file" }],
  Slug: [{ label: "Slug", accessor: "slug", type: "text" }],
  Type: [
    {
      label: "Type",
      accessor: "type",
      type: "select",
      isSearchable: false,
      options: TypesSelectOptions,
    },
  ],
};
