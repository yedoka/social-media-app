import Root from "../layout/Root";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]