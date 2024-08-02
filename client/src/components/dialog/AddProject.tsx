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

const AddProject: React.FC<{
  setShow: (isOpen: boolean) => void;
  setNewProject: (project: ProjectListType) => void;
}> = ({ setShow, setNewProject }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: TitleValidationSchema,
    onSubmit: ({ title }) => {
      setIsSubmitting(true);
      axiosJWT
        .post(PROJECT_URL, { title })
        .then(({ data }) => {
          showToast(data.message);
          setNewProject(data.newProject);
          setShow(false);
        })
        .catch(({ response }) => {
          const { message } = response.data;
          formik.errors.title = message;
        })
        .finally(() => setIsSubmitting(false));
    },
  });

  return (
    <Dialog onOpenChange={() => setShow(false)} defaultOpen>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create a new project
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
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
