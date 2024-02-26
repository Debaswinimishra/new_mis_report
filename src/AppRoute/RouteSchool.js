import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SchoolRoot from "../Pages/School";
import Dashboard from "../Pages/School/Dashboard/Dashboard";
// import Module8 from "../Pages/School/Module8/Module8";
// import Module9 from "../Pages/School/Module9/Module9";
import PrivateRoute from "./PrivateRoute";
const RouteSchool = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  // if (isLoggedin === "true") {
  return (
    <Routes>
      <Route
        path="/school/*"
        element={<PrivateRoute element={<SchoolRoot />} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/*" element={<PrivateRoute element={<SchoolRoot />} />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
  // } else {
  //   // Redirect to the home page if not logged in
  //   return <navigate to="*" />;
  // }
};
export default RouteSchool;
