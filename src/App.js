import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import TransaksiPage from "./pages/TransaksiPage";

const Protected = () => {
  // TODO: CREATE endpoint for checking token when this component invoked!
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"))
  return <>
      <SideMenu />
      {isAuthenticated ? <Outlet />: <LoginPage />}
    </>
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected />}>
          <Route index element={<DashboardPage />} />
          <Route path="/transaksi" element={<TransaksiPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
