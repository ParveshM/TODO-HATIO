export type ProjectListType = {
  _id: string;
  title: string;
  createdAt: Date;
};

export type TodoType = {
  _id: string;
  description: string;
  status: "active" | "completed";
};

export type EditTodoType = {
  isEditing: boolean;
  _id: string | null;
  description: string | null;
};

export type DeleteConfirmation = {
  show: boolean;
  _id: string | null;
};
