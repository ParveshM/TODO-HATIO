import { Checkbox } from "@/components/ui/checkbox";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { TodoType } from "@/types";
import { useState } from "react";

type TodolistProps = TodoType & {
  handleTaskStatusChange: (id: string) => void;
  handleEditTodo: (id: string, description: string) => void;
  handleDeleteTodo: (id: string) => void;
};
const TodoList: React.FC<TodolistProps> = ({
  _id,
  description,
  status,
  handleTaskStatusChange,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    status === "completed" ? true : false
  );
  return (
    <div className="flex items-center justify-between border rounded-md shadow-md p-2">
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => {
          setIsChecked(!isChecked);
          handleTaskStatusChange(_id);
        }}
      />
      <p
        className={`flex-1 mx-2 from-neutral-300 break-all ${
          status === "completed" && "line-through"
        }`}
      >
        {description}
      </p>
      <div className="flex gap-2">
        <Button
          onClick={() => handleEditTodo(_id, description)}
          className="px-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md shadow hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          <Edit2Icon className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => handleDeleteTodo(_id)}
          className="px-2 text-sm font-medium text-red-600 bg-red-100 rounded-md shadow hover:bg-red-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50"
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
