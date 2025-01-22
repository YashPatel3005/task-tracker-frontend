import { Auth } from "./utils/router/AuthRoutes";
import { Home } from "./utils/router/HomeRoutes";
import { LocalStorage } from "./utils/helpers";
import { useAppSelector } from "./store/store";

function App() {
  const sessionToken = LocalStorage.getItem("UserSession");

  const isUserAuthenticated = sessionToken
    ? JSON.parse(sessionToken).token
    : null;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return <>{isUserAuthenticated || isLoggedIn ? <Home /> : <Auth />}</>;
}

export default App;
