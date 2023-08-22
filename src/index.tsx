import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { dummyApi } from "./services/dummyApi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApiProvider api={dummyApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
