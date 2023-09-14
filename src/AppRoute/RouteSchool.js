import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SchoolRoot from "../Pages/School";
import Module7 from "../Pages/School/Module7/Module7";
import Module8 from "../Pages/School/Module8/Module8";
import Module9 from "../Pages/School/Module9/Module9";

const RouteSchool = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  if (isLoggedin === "true") {
    return (
      <Routes>
        <Route path="/school" element={<SchoolRoot />}>
          <Route path="" element={<Module7 />} />
          <Route path="module7" element={<Module7 />} />
          <Route path="module8" element={<Module8 />} />
          <Route path="module9" element={<Module9 />} />
        </Route>
      </Routes>
    );
  } else {
    // Redirect to the home page if not logged in
    return <navigate to="*" />;
  }
};
export default RouteSchool;