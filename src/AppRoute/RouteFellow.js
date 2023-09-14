import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FellowRoot from "../Pages/Fellow";
import Module4 from "../Pages/Fellow/Module4/Module4";
import Module5 from "../Pages/Fellow/Module5/Module5";
import Module6 from "../Pages/Fellow/Module6/Module6";
import CommonMonthlyQuiz from "../Pages/Fellow/CommonMonthlyQuiz/CommonMonthlyQuiz";
// import ComunityEducator from "../Pages/Fellow/ComunityEducator/ComunityEducator";
import CommunityEducator from "../Pages/Fellow/CommunityEducator/CommunityEducator";
import NewTraining from "../Pages/Fellow/NewTraining/NewTraining";
import PrivateRoute from "./PrivateRoute";
// import * from "../AppRoute/Route404";
// import FelloRoutes from "../Pages/Fellow/FelloRoutes";

const RouteFellow = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  // if (isLoggedin === "true") {
  return (
    <Routes>
      <Route
        path="/fellow/*"
        element={<PrivateRoute element={<FellowRoot />} />}
      >
        <Route index element={<Module4 />} />
        <Route path="dashboard" element={<Module4 />} />
        <Route path="module5" element={<Module5 />} />
        <Route path="module6" element={<Module6 />} />
        <Route path="commonmonthlyquiz" element={<CommonMonthlyQuiz />} />
        <Route path="communityeducator" element={<CommunityEducator />} />
        <Route path="trainingmodule" element={<NewTraining />} />
      </Route>
    </Routes>
  );
  // } else {
  //   // Redirect to the home page if not logged in
  //   return <navigate to="*" />;
  // }
};
export default RouteFellow;
