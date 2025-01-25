import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";

import { routes } from "@/constants/router";
import { store } from "@/store/store";
import '@/index.css';

const router = createBrowserRouter(routes);

const App = () => (
  <div className="bg-dark-bg">
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </div>
);

export default App;
