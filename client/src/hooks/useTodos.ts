import { useParams } from "react-router-dom";
import { removeItem } from "@/utils/localStorageUtil";
import { useEffect, useState } from "react";
import { DeleteConfirmation, EditTodoType, TodoType } from "@/types";
import showToast from "@/utils/toaster";
import { PROJECT_URL } from "@/constants";
import axiosJWT from "@/utils/axiosJWT";

export default function useTodos() {
  const { projectId } = useParams();

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [description, setDescription] = useState<string>("");
  const [editTodo, setEditTodo] = useState<EditTodoType>({
    isEditing: false,
    description: null,
    _id: null,
  });
  const [confirmation, setConfirmation] = useState<DeleteConfirmation>({
    show: false,
    _id: null,
  });

  useEffect(() => {
    axiosJWT
      .get(PROJECT_URL + `/${projectId}/todos`)
      .then(({ data }) => setTodos(data.todos))
      .catch((err) => console.log(err));
    return () => removeItem("title");
  }, []);

  /**
   * * Add or edit TODO
   */
  const handleAddOrUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length < 5) {
      showToast("Atleast 5 characters required", "error");
      return;
    }

    // Editing TODO
    if (editTodo.isEditing) {
      if (description.trim() === editTodo.description) {
        setEditTodo({ isEditing: false, _id: null, description: null });
        setDescription("");
        return;
      }
      updateTodo();
      return;
    }

    // Adding a new Todo item
    axiosJWT
      .post(PROJECT_URL + `/${projectId}/todos`, { description })
      .then(({ data }) => {
        setTodos((prev) => [data.newTodo, ...prev]);
        showToast(data.message);
      })
      .catch(({ response }) => {
        const { message } = response.data;
        showToast(message, "error");
      })
      .finally(() => setDescription(""));
  };

  /**
   * * Update status completed or active
   */
  const handleTaskStatusChange = (id: string) => {
    let currentStatus: string = "";
    setTodos((prev) =>
      prev.map((todo) => {
        const newStatus = todo.status === "active" ? "completed" : "active";
        currentStatus = newStatus;
        return todo._id === id
          ? {
              ...todo,
              status: newStatus,
            }
          : todo;
      })
    );
    axiosJWT
      .patch(PROJECT_URL + `/${projectId}/todos/${id}`, {
        status: currentStatus,
      })
      .then(({ data }) => {
        showToast(data.message);
      })
      .catch(({ response }) => {
        const { message } = response.data;
        showToast(message, "error");
      });
  };

  const handleEditTodo = (_id: string, description: string) => {
    setDescription(description);
    setEditTodo({ isEditing: true, _id, description });
  };

  const updateTodo = () => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === editTodo._id ? { ...todo, description } : todo
      )
    );

    axiosJWT
      .patch(PROJECT_URL + `/${projectId}/todos/${editTodo._id}`, {
        description,
      })
      .then(({ data }) => {
        setEditTodo({ isEditing: false, _id: null, description: null });
        showToast(data.message);
      })
      .catch(({ response }) => {
        const { message } = response.data;
        showToast(message, "error");
      })
      .finally(() => setDescription(""));
  };

  /**
   * * Delete todo
   */
  const handleDeleteTodo = (_id: string) =>
    setConfirmation({ show: true, _id });

  const handleDeleteTrue = () => {
    setTodos((prev) => prev.filter((todo) => todo._id !== confirmation._id));
    axiosJWT
      .delete(PROJECT_URL + `/${projectId}/todos/${confirmation._id}`)
      .then(({ data }) => {
        setConfirmation({ show: false, _id: null });
        showToast(data.message);
      })
      .catch(({ response }) => {
        const { message } = response.data;
        showToast(message, "error");
      });
  };

  const handleDeleteFalse = () => setConfirmation({ show: false, _id: null });

  return {
    todos,
    description,
    editTodo,
    confirmation,
    setDescription,
    handleAddOrUpdateTodo,
    handleTaskStatusChange,
    handleEditTodo,
    handleDeleteTodo,
    handleDeleteTrue,
    handleDeleteFalse,
  };
}
