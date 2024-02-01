import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { init } from "@noriginmedia/norigin-spatial-navigation";

init({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
