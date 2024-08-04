import AddEditProject from "@/components/dialog/AddEditProject";
import ConfirmationModal from "@/components/dialog/ConfirmationModal";
import ShareLinkAlert from "@/components/dialog/ShareLinkAlert";
import ProjectList from "@/components/List/ProjectList";
import ProjectShimmer from "@/components/shimmer/ProjectShimmer";
import { Button } from "@/components/ui/button";
import { PROJECT_URL } from "@/constants";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { DeleteConfirmation, ProjectListType } from "@/types";
import axiosJWT from "@/utils/axiosJWT";
import showToast from "@/utils/toaster";
import { useEffect, useState } from "react";

const Home = () => {
  const { lastItemRef, isLoading, page, setHasMore, setIsLoading } =
    useInfiniteScroll();
  const [projects, setProjects] = useState<ProjectListType[]>([]);
  const [confirmation, setConfirmation] = useState<DeleteConfirmation>({
    show: false,
    _id: null,
  });
  const [modal, setModal] = useState<{
    show: boolean;
    action: "add" | "edit";
    title?: string | null;
    _id?: string | null;
  }>({
    show: false,
    action: "add",
    title: null,
    _id: null,
  });
  const [shareLink, setShareLink] = useState<{
    show: boolean;
    url: string | null;
  }>({ show: false, url: null });

  useEffect(() => {
    setIsLoading(true);
    axiosJWT
      .get(PROJECT_URL, { params: { page } })
      .then(({ data }) => {
        setProjects((prev) => [...prev, ...data.projects]);
        setHasMore(data.projects.length > 0);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handleNewProject = (project: ProjectListType) => {
    console.log(project, "calling");
    setProjects((prev) => {
      prev.unshift(project);
      return prev;
    });
  };

  const handleEditProject = (_id: string, title: string) => {
    setModal({ show: true, action: "edit", _id, title });
  };

  const handleUpdateProjectName = (title: string) => {
    setProjects((prev) => {
      return prev.map((p) => (p._id === modal._id ? { ...p, title } : p));
    });
  };

  const handleDeleteProject = (_id: string) =>
    setConfirmation({ show: true, _id });

  // handle modal confirmation
  const handleDeleteTrue = () => {
    if (confirmation._id) {
      setProjects((prev) =>
        prev.filter((project) => project._id !== confirmation._id)
      );
      axiosJWT
        .delete(`${PROJECT_URL}/${confirmation._id}`)
        .then(({ data }) => showToast(data.message))
        .catch(() =>
          showToast(
            "Sorry, the action could not be completed. Please try again later.",
            "error"
          )
        );
    }
    setConfirmation({ show: false, _id: null });
  };
  const handleDeleteFalse = () => setConfirmation({ show: false, _id: null });

  const handleSetshareLink = (url: string) => setShareLink({ show: true, url });

  return (
    <div className="flex justify-center ">
      <div className="md:w-8/12 ">
        <div className="flex gap-5 justify-between mr-5 pt-10 md:pt-20">
          <h1 className="text-2xl font-semibold ">Projects</h1>
          <Button onClick={() => setModal({ show: true, action: "add" })}>
            New Project
          </Button>
        </div>

        <div className="space-y-4 mt-5 p-5 rounded-md shadow-md border">
          <div className="flex flex-col space-y-4">
            {projects.length ? (
              projects.map((project, i) => (
                <ProjectList
                  {...project}
                  handleEditProject={handleEditProject}
                  handleDeleteProject={handleDeleteProject}
                  handleSetshareLink={handleSetshareLink}
                  ref={i === projects.length - 1 ? lastItemRef : null}
                  key={project._id}
                />
              ))
            ) : (
              <h1 className="text-lg font-normal ">
                No projects found, create one by clicking the new project.
              </h1>
            )}

            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <ProjectShimmer key={i} />
              ))}
          </div>
        </div>
      </div>
      {shareLink.show && (
        <ShareLinkAlert
          url={shareLink.url}
          setShow={() => setShareLink({ show: false, url: null })}
        />
      )}
      {modal.show && modal.action === "add" && (
        <AddEditProject
          action="add"
          handleNewProject={handleNewProject}
          setShow={() => setModal({ show: false, action: "add" })}
        />
      )}
      {modal.show && modal.action === "edit" && (
        <AddEditProject
          action="edit"
          currentProjectInfo={{ _id: modal._id!, title: modal.title! }}
          handleUpdateProjectName={handleUpdateProjectName}
          setShow={() => setModal({ show: false, action: "edit" })}
        />
      )}
      {confirmation.show && (
        <ConfirmationModal
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
    </div>
  );
};

export default Home;
