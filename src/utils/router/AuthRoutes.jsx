import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";

function Auth() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export { Auth };
