import { Route, Routes } from "react-router-dom";
import SignIn from "../../containers/auth/SignIn";
import SignUp from "../../containers/auth/SignUp";

function Auth() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="*" element={<Navigate to="/home" />} /> */}
    </Routes>
  );
}

export { Auth };
