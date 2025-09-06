import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import NavContext from "./context/NavContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NavContext>
        <App />
      </NavContext>
    </BrowserRouter>
  </StrictMode>
);
