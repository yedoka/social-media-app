import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import "./styles/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
