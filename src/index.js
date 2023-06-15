import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/lab10">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
