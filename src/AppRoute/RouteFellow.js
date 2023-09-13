import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FellowRoot from "../pages/Fellow";
import Module4 from "../pages/Fellow/Module4/Module4";
import Module5 from "../pages/Fellow/Module5/Module5";
import Module6 from "../pages/Fellow/Module6/Module6";

const RouteFellow = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  if (isLoggedin === "true") {
    return (
      <Routes>
        <Route path="/fellow" element={<FellowRoot />}>
          <Route index element={<Module4 />} />
          <Route path="module4" element={<Module4 />} />
          <Route path="module5" element={<Module5 />} />
          <Route path="module6" element={<Module6 />} />
        </Route>
      </Routes>
    );
  } else {
    // Redirect to the home page if not logged in
    return <navigate to="*" />;
  }
};
export default RouteFellow;
