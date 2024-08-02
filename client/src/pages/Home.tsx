import AddProject from "@/components/dialog/AddProject";
import ConfirmationModal from "@/components/dialog/ConfirmationModal";
import ProjectList from "@/components/List/ProjectList";
import ProjectShimmer from "@/components/shimmer/ProjectShimmer";
import { Button } from "@/components/ui/button";
import { PROJECT_URL } from "@/constants";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ProjectListType } from "@/types";
import axiosJWT from "@/utils/axiosJWT";
import showToast from "@/utils/toaster";
import { useEffect, useState } from "react";

const Home = () => {
  const { lastItemRef, isLoading, page, setHasMore, setIsLoading } =
    useInfiniteScroll();
  const [projects, setProjects] = useState<ProjectListType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<{
    show: boolean;
    id: string | null;
  }>({ show: false, id: null });

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

  const handleNewProject = (project: ProjectListType) =>
    setProjects((prev) => {
      prev.unshift(project);
      return prev;
    });

  const handleDeleteProject = (id: string) =>
    setConfirmation({ show: true, id });

  // handle modal confirmation
  const handleDeleteTrue = () => {
    if (confirmation.id) {
      setProjects((prev) =>
        prev.filter((project) => project._id !== confirmation.id)
      );
      axiosJWT
        .delete(`${PROJECT_URL}/${confirmation.id}`)
        .then(({ data }) => showToast(data.message))
        .catch(() =>
          showToast(
            "Sorry, the action could not be completed. Please try again later.",
            "error"
          )
        );
    }
    setConfirmation({ show: false, id: null });
  };
  const handleDeleteFalse = () => setConfirmation({ show: false, id: null });

  return (
    <div className="flex justify-center ">
      <div className="md:w-8/12 ">
        <div className="flex gap-5 justify-between mr-5 pt-10 md:pt-20">
          <h1 className="text-2xl font-semibold ">Projects</h1>
          <Button onClick={() => setShowModal(true)}>New Project</Button>
        </div>

        <div className="space-y-4 mt-5 p-5 rounded-md shadow-md border">
          <div className="flex flex-col space-y-4 ">
            {projects.length ? (
              projects.map((project, i) => (
                <ProjectList
                  {...project}
                  handleDeleteProject={handleDeleteProject}
                  key={project._id}
                  ref={i === projects.length - 1 ? lastItemRef : null}
                />
              ))
            ) : (
              <h1 className="text-lg font-medium ">No projects.</h1>
            )}

            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <ProjectShimmer key={i} />
              ))}
          </div>
        </div>
      </div>
      {showModal && (
        <AddProject setNewProject={handleNewProject} setShow={setShowModal} />
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
