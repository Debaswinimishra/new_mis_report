import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AnganwadiRoot from "../Pages/Anganwadi";
import Module1 from "../Pages/Anganwadi/Module1/Module1";
import Module2 from "../Pages/Anganwadi/Module2/Module2";
import Module3 from "../Pages/Anganwadi/Module3/Module3";

const RouteAnganwadi = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  if (isLoggedin === "true") {
    return (
      <Routes>
        <Route path="/anganwadi" element={<AnganwadiRoot />}>
          <Route path="" element={<Module1 />} />
          <Route path="module1" element={<Module1 />} />
          <Route path="module2" element={<Module2 />} />
          <Route path="module3" element={<Module3 />} />
        </Route>
      </Routes>
    );
  } else {
    // Redirect to the home page if not logged in
    return <navigate to="*" />;
  }
};
export default RouteAnganwadi;
