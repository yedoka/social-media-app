import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";
import { AppProviders } from "./AppProviders";

import "@/app/index.css";

export const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
