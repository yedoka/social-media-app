import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/app/routes";
import { AppProviders } from "@/app/AppProviders";
import "@/app/index.css";

export const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
