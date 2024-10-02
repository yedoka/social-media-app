import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
