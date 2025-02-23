import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routes } from "@/constants/router";
import { store } from "@/store/store";
import '@/index.css';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

const App = () => (
  <CookiesProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </CookiesProvider>
);

export default App;
