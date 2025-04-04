import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { AppProvider } from "./context/AppContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer />
  </AppProvider>
);
