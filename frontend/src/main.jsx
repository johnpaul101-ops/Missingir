import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIContextProvider } from "./contexts/UIContext.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <UIContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer />
  </UIContextProvider>,
);
