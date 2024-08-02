const ProjectShimmer = () => {
  return (
    <div className="flex items-center justify-between py-2 bg-white rounded-lg shadow-sm animate-pulse">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
        <div className="h-12 w-12 p-2 rounded-md bg-slate-200">
          <div className="h-full w-full bg-slate-300 rounded-md"></div>
        </div>
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded-full mb-2 w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
export default ProjectShimmer;
