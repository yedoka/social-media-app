import { App } from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "./AppProviders";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
