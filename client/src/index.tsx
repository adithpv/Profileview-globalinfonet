import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ProfileViewData } from "../src/context/userProfileContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfileViewData>
        <App />
      </ProfileViewData>
    </BrowserRouter>
  </React.StrictMode>
);
