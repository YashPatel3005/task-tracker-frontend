import React, { useEffect, useState } from "react";
import { Auth } from "./utils/router/AuthRoutes";
import { Home } from "./utils/router/HomeRoutes";
import { LocalStorage } from "./utils/helpers";
import { STATUS } from "./components/common/model/common.model";
import { useAppSelector } from "./store/store";

function App() {
  const sessionToken = LocalStorage.getItem("UserSession");

  const isUserAuthenticated = sessionToken
    ? JSON.parse(sessionToken).token
    : null;
  // const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   if (sessionToken && isLoggedIn) {
  //     setIsUserAuthenticated(
  //       sessionToken ? JSON.parse(sessionToken).token : null
  //     );
  //   }
  // }, [sessionToken, isUserAuthenticated, isLoggedIn]);

  return (
    <React.Fragment>
      {isUserAuthenticated || isLoggedIn ? <Home /> : <Auth />}
    </React.Fragment>
  );
}

export default App;
