import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AnganwadiRoot from "../Pages/Anganwadi";
import Dashboard from "../Pages/Anganwadi/Dashboard/Dashboard";
// import Module2 from "../Pages/Anganwadi/Module2/Module2";
// import Module3 from "../Pages/Anganwadi/Module3/Module3";
import PrivateRoute from "./PrivateRoute";
const RouteAnganwadi = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  // if (isLoggedin === "true") {
  return (
    <Routes>
      <Route
        path="/anganwadi/*"
        element={<PrivateRoute element={<AnganwadiRoot />} />}
      >
        {/* <Route path="/anganwadi" element={<AnganwadiRoot />}> */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="" element={<Dashboard />} />
        {/* <Route path="module2" element={<Module2 />} />
        <Route path="module3" element={<Module3 />} /> */}
      </Route>

      <Route path="/*" element={<PrivateRoute element={<AnganwadiRoot />} />}>
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
export default RouteAnganwadi;
