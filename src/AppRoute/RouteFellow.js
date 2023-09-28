import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FellowRoot from "../pages/Fellow";
import Dashboard from "../pages/Fellow/Dashboard/Dashboard";

import CommonMonthlyQuiz from "../pages/Fellow/CommonMonthlyQuiz/CommonMonthlyQuiz";
// import ComunityEducator from "../Pages/Fellow/ComunityEducator/ComunityEducator";
import CommunityEducator from "../pages/Fellow/CommunityEducator/CommunityEducator";
import NewTraining from "../pages/Fellow/NewTraining/NewTraining";
import StudentProgressReport from "../pages/Fellow/StudentProgressReport/StudentProgressReport";
import PrivateRoute from "./PrivateRoute";
import FellowDetails from "../pages/Fellow/FellowDetails/FellowDetails";

// import * from "../AppRoute/Route404";
// import FelloRoutes from "../Pages/Fellow/FelloRoutes";

const RouteFellow = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  ////console.log("isLoggedinfellow--->", isLoggedin);
  // if (isLoggedin === "true") {
  return (
    <Routes>
      <Route
        path="/fellow/*"
        element={<PrivateRoute element={<FellowRoot />} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="commonmonthlyquiz" element={<CommonMonthlyQuiz />} />
        <Route path="communityeducator" element={<CommunityEducator />} />
        <Route path="trainingmodule" element={<NewTraining />} />
        <Route
          path="studentprogressreport"
          element={<StudentProgressReport />}
        />
        <Route path="fellowdetails" element={<FellowDetails />} />
      </Route>
    </Routes>
  );
  // } else {
  //   // Redirect to the home page if not logged in
  //   return <navigate to="*" />;
  // }
};
export default RouteFellow;
