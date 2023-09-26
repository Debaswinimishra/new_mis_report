import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FellowRoot from "../Pages/Fellow";
import Dashboard from "../Pages/Fellow/Dashboard/Dashboard";

import CommonMonthlyQuiz from "../Pages/Fellow/CommonMonthlyQuiz/CommonMonthlyQuiz";
// import ComunityEducator from "../Pages/Fellow/ComunityEducator/ComunityEducator";
import CommunityEducator from "../Pages/Fellow/CommunityEducator/CommunityEducator";
import NewTraining from "../Pages/Fellow/NewTraining/NewTraining";
import StudentProgressReport from "../Pages/Fellow/StudentProgressReport/StudentProgressReport";
import PrivateRoute from "./PrivateRoute";
import FellowDetails from "../Pages/Fellow/FellowDetails/FellowDetails";

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
