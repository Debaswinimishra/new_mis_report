import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SchoolRoot from "../pages/School";
import Dashboard from "../pages/School/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

const RouteSchool = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  ////console.log("isLoggedinfellow--->", isLoggedin);
  // if (isLoggedin === "true") {
  return (
    <Routes>
      <Route
        path="/school/*"
        element={<PrivateRoute element={<SchoolRoot />} />}
      >
        {/* <Route path="/school" element={<SchoolRoot />}> */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="module8" element={<Module8 />} />
        <Route path="module9" element={<Module9 />} /> */}
      </Route>
    </Routes>
  );
  // } else {
  //   // Redirect to the home page if not logged in
  //   return <navigate to="*" />;
  // }
};
export default RouteSchool;
