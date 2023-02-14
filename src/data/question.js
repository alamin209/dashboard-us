export const QuestionTableHead = [
  { label: "", accessor: "checkbox" },
  { label: "Question", accessor: "question" },
  { label: "Created At", accessor: "createdAt" },
  { label: "Updated At", accessor: "updatedAt" },
  { label: "", accessor: "actions" },
];

export const QuestionInputs = {
  question: [{ label: "Question", accessor: "question", type: "text" }],
};

export const QuestionsDeletedFields = ["createdAt", "updatedAt", "_id", "__v"];
