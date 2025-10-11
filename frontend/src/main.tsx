import "./config/env";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import router from "./router";

console.log(
  "CANISTER_ID_INTERNET_IDENTITY:",
  import.meta.env.CANISTER_ID_INTERNET_IDENTITY
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
