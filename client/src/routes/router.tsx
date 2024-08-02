import Layout from "@/pages/Layout";
import { Login } from "@/pages/Login";
import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router";
import { ProtectedRoute, PublicRoute } from "./RouterGuard";
import Home from "@/pages/Home";
import PageNotFound from "@/pages/PageNotFound";
import Todo from "@/pages/Todo";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/:projectId/todo" element={<Todo />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRouter;
