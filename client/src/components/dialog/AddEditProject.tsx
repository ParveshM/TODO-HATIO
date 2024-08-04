import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProjectListType } from "@/types";
import axiosJWT from "@/utils/axiosJWT";
import { PROJECT_URL } from "@/constants";
import { useFormik } from "formik";
import { TitleValidationSchema } from "@/utils/validation";
import showToast from "@/utils/toaster";
import { FolderPlus, Pencil } from "lucide-react";

type AddEditProjectProps = {
  setShow: () => void;
  handleNewProject?: (project: ProjectListType) => void;
  handleUpdateProjectName?: (title: string) => void;
  action: "add" | "edit";
  currentProjectInfo?: { _id: string; title: string };
};

const AddEditProject: React.FC<AddEditProjectProps> = ({
  setShow,
  handleUpdateProjectName,
  handleNewProject,
  action,
  currentProjectInfo,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      title: currentProjectInfo?.title || "",
    },
    validationSchema: TitleValidationSchema,
    onSubmit: ({ title }) => {
      setIsSubmitting(true);
      if (action === "add") {
        axiosJWT
          .post(PROJECT_URL, { title })
          .then(({ data }) => {
            showToast(data.message);
            handleNewProject && handleNewProject(data.newProject);
            setShow();
          })
          .catch(({ response }) => {
            const { message } = response.data;
            formik.errors.title = message;
          })
          .finally(() => setIsSubmitting(false));
        return;
      }
      if (currentProjectInfo && currentProjectInfo.title === title.trim()) {
        setShow();
        return;
      }
      axiosJWT
        .patch(PROJECT_URL + `/${currentProjectInfo?._id}`, { title })
        .then(({ data }) => {
          showToast(data.message);
          handleUpdateProjectName && handleUpdateProjectName(title);
          setShow();
        })
        .catch(({ response }) => {
          const { message } = response.data;
          formik.errors.title = message;
        })
        .finally(() => setIsSubmitting(false));
    },
  });

  return (
    <Dialog onOpenChange={setShow} defaultOpen>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {action === "add" ? (
              <h2 className="flex items-center  gap-2 text-xl font-semibold">
                Create a new project
                <FolderPlus className="size-5 mt-1" />
              </h2>
            ) : (
              <h2 className="flex items-center  gap-2 text-xl font-semibold">
                Edit Project
                <Pencil className="size-5 mt-1" />
              </h2>
            )}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="grid gap-6 pt-4" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="">
              Project Title
            </Label>
            <div className="col-span-3">
              <Input
                {...formik.getFieldProps("title")}
                type="text"
                id="title"
                className="py-2 h-8"
              />
            </div>
            {formik.touched.title && formik.errors.title && (
              <p className=" col-span-4 text-sm text-center text-red-500">
                {formik.errors.title}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <Button disabled={isSubmitting} type="submit">
              {action === "add" ? "Submit" : "save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProject;
