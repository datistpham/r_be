import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import BanquetHallAdmin from "./pages/banquet-hall/BanquetHallAdmin";
import MenuAdmin from "./pages/menu/MenuAdmin";

function IndexAdmin() {
  return (
      <>
        <Topbar />
        <div className="container-admin">
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />}>
                </Route>
                <Route path="/users" element={<UserList />}>
                </Route>
                <Route path={"/banquet-hall"} element={<BanquetHallAdmin />} />
                <Route path={"/dish"} element={<MenuAdmin />} />
            </Routes>
        </div>
      </>
  );
}

export default IndexAdmin;
