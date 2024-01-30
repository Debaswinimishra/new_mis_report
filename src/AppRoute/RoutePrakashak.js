import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PrakashakRoot from "../Pages/Prakashak";
import Dashboard from "../Pages/Prakashak/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import RemoteInstruction from "../Pages/Prakashak/RemoteInstruction/RemoteInstruction";
const RoutePrakashak = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  return (
    <Routes>
      <Route
        path="/prakashak/*"
        element={<PrivateRoute element={<PrakashakRoot />} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="remote_instructions" element={<RemoteInstruction />} />
      </Route>
    </Routes>
  );
};
export default RoutePrakashak;
