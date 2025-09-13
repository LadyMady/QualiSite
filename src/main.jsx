import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import QualiSite from "./QualiSite";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QualiSite />
  </React.StrictMode>
);