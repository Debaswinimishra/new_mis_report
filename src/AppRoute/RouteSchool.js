import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SchoolRoot from "../Pages/School";
import Dashboard from "../Pages/School/Dashboard/Dashboard";
// import Module8 from "../Pages/School/Module8/Module8";
// import Module9 from "../Pages/School/Module9/Module9";
import PrivateRoute from "./PrivateRoute";
import Route404 from "./Route404";
const RouteSchool = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);

  return (
    <Routes>
      <Route path="/school" element={<PrivateRoute element={<SchoolRoot />} />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="" element={<Dashboard />} />
      </Route>
      {/* <Route path="*" element={<Route404 />} /> */}
      {/* <Route path="*" element={<Navigate to="/school/dashboard" />} /> */}
    </Routes>
  );
};
export default RouteSchool;
