import React from "react";
import { createRoot } from "react-dom/client";
import Site from "./App";

const root = document.getElementById("root")!;
createRoot(root).render(
  <React.StrictMode>
    <Site />
  </React.StrictMode>
);
