import { Download, Edit2Icon, FolderIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { forwardRef } from "react";
import { ProjectListType } from "@/types";
import { Link } from "react-router-dom";
import { setItem } from "@/utils/localStorageUtil";
type Props = ProjectListType & {
  handleEditProject: (id: string, title: string) => void;
  handleDeleteProject: (id: string) => void;
};
const ProjectList: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { _id, title, createdAt, handleEditProject, handleDeleteProject },
  ref
) => {
  return (
    <div
      ref={ref}
      className="flex items-center justify-between gap-2 py-2 px-2 bg-background rounded-lg shadow-sm transition-colors hover:bg-muted"
    >
      <Link to={`/${_id}/todo`} onClick={() => setItem("title", title)}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="size-12 p-2 bg-muted rounded-md text-muted-foreground">
            <FolderIcon className="h-full w-full" />
          </div>
          <div>
            <h3 className="text-lg font-medium break-all">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="flex gap-2">
          <Button
            onClick={() => handleEditProject(_id, title)}
            className="px-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md shadow hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          >
            <Edit2Icon className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => handleDeleteProject(_id)}
            className="px-2 text-sm font-medium text-red-600 bg-red-100 rounded-md shadow hover:bg-red-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50"
          >
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
        <Button className="inline-flex h-9 px-4 text-sm font-medium text-primary-foreground bg-blue-700 rounded-md shadow transition-colors hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Download className="mr-2 size-6" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default forwardRef(ProjectList);
