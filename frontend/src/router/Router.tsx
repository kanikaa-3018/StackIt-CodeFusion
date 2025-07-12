import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import AddQuestion from "@/pages/AddQuestion";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
        <Route path="/add-question" element={<AddQuestion />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
