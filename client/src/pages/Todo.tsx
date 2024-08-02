import { useParams } from "react-router-dom";

const Todo = () => {
  const { projectId } = useParams();
  return <div className="pt-20">{projectId}</div>;
};

export default Todo;
