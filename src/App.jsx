import React from "react";
import { Auth } from "./utils/router/auth";
import { Home } from "./utils/router/home";

function App() {
  // const { isUserAuthenticated = false } = useSelector(
  //   (state) => state.authReducer
  // );
  const isUserAuthenticated = false;

  return (
    <React.Fragment>{isUserAuthenticated ? <Home /> : <Auth />}</React.Fragment>
  );
}

export default App;
