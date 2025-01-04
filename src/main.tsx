import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./constants/router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles/globals.scss";
import { CookiesProvider } from 'react-cookie';

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </CookiesProvider>
);
