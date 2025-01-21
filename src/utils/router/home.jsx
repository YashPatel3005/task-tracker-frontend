import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../../containers/auth/SignIn";
// import { AppLayout } from "layouts/app-layout";

function Home() {
  return (
    <Routes>
      <Route
        exact
        path="/home"
        // element={
        //   <AppLayout>
        //     <SignIn />
        //   </AppLayout>
        // }
      />
      {/* <AppLayout><DocList /></AppLayout> */}
      {/* <Route path="/home/:id" element={<SignIn />} /> */}
      {/* <AppLayout><DocDetails /></AppLayout> */}

      <Navigate to="/home" />
    </Routes>
  );
}

export { Home };
