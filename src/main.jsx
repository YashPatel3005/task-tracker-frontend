import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/index.jsx";
import "./style/style.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </BrowserRouter>
  </ThemeProvider>
  // </StrictMode>
);
