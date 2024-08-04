import { Button } from "@/components/ui/button";
import TodoList from "@/components/List/TodoList";
import { getItem } from "@/utils/localStorageUtil";
import useTodos from "@/hooks/useTodos";
import ConfirmationModal from "@/components/dialog/ConfirmationModal";

const Todo = () => {
  const {
    todos,
    description,
    editTodo,
    confirmation,
    setDescription,
    handleEditTodo,
    handleAddOrUpdateTodo,
    handleTaskStatusChange,
    handleDeleteTodo,
    handleDeleteTrue,
    handleDeleteFalse,
  } = useTodos();

  return (
    <div className="flex justify-center pt-10 md:pt-20">
      <div className="max-w-lg w-full px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl pb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
            {getItem("title")}
          </h1>
          <h2 className="text-xl font-bold text-blue-800 text-center">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>
        </div>
        <div className="mt-6">
          <form className="flex mb-4" onSubmit={handleAddOrUpdateTodo}>
            <input
              placeholder="Do something 😃"
              onChange={(e) => setDescription(e.target.value.trim())}
              value={description}
              className="w-full border-r-0 rounded-r-none h-10 focus:outline-none rounded-md border border-input bg-background px-3 py-2 text-sm"
            />

            <Button
              type="submit"
              className="border-l-0 rounded-l-none bg-blue-500 hover:bg-blue-600"
            >
              {editTodo.isEditing ? "Save" : "Add"}
            </Button>
          </form>
          {/* List */}
          <div className="flex flex-col gap-3">
            {todos.map((todo) => (
              <TodoList
                {...todo}
                key={todo._id}
                handleTaskStatusChange={handleTaskStatusChange}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            ))}
          </div>
        </div>
      </div>
      {confirmation.show && (
        <ConfirmationModal
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
    </div>
  );
};

export default Todo;
