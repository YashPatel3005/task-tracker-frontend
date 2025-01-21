import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../../layouts/AppLayout";
import TaskList from "../../pages/task/TaskList";
import TaskDetails from "../../components/TaskDetails";

function Home() {
  return (
    <Routes>
      <Route
        exact
        path="/home"
        element={
          <AppLayout>
            <TaskList />
          </AppLayout>
        }
      />
      <Route
        exact
        path="/home/:id"
        element={
          <AppLayout>
            <TaskDetails />
          </AppLayout>
        }
      />
      {/* <Navigate to="/home" /> */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export { Home };
