import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FellowRoot from "../Pages/Fellow";
import Dashboard from "../Pages/Fellow/Dashboard/Dashboard";

import CommonMonthlyQuiz from "../Pages/Fellow/CommonMonthlyQuiz/CommonMonthlyQuiz";
// import ComunityEducator from "../Pages/Fellow/ComunityEducator/ComunityEducator";
import CommunityEducator from "../Pages/Fellow/CommunityEducator/CommunityEducator";
import NewTraining from "../Pages/Fellow/NewTraining/NewTraining";
import StudentProgressReport from "../Pages/Fellow/StudentProgressReport/StudentProgressReport";
import PrivateRoute from "./PrivateRoute";
import EducatorsDetails from "../Pages/Fellow/EducatorsDetails/EducatorsDetails";
import TrainingDetails from "../Pages/Fellow/TrainingDetails/TrainingDetails";
import Assessments from "../Pages/Fellow/Assessments/Assessments";
import OverallTimespent from "../Pages/Fellow/OverallTimespent/OverallTimespent";
import TimespentDetails from "../Pages/Fellow/TimespentDetails/TimespentDetails";
import Feedback from "../Pages/Fellow/Feedback/Feedback";
import Route404 from "./Route404";
import OnlineReport from "../Pages/Fellow/OnlineReport/OnlineReport";
// import { TimeSpentReportModuleWise } from "../Pages/Fellow/TimeSpentReportModuleWise/TimeSpentReportModuleWise";
import TimeSpentReportModuleWise from "../Pages/Fellow/TimeSpentReportModuleWise/TimeSpentReportModuleWise";
import TimespentReport from "../Pages/Fellow/TimespentReport/TimespentReport";

const RouteFellow = () => {
  const Navigate = useNavigate();
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinfellow--->", isLoggedin);
  // if (isLoggedin === "true") {
  const userType = localStorage.getItem("usertype");
  console.log("userType---->", userType);

  if (!isLoggedin) {
    return <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route path="/fellow" element={<PrivateRoute element={<FellowRoot />} />}>
        <Route index element={<Dashboard />} />
        <Route path="" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="common_monthly_quiz" element={<CommonMonthlyQuiz />} />
        <Route path="overall_c.e" element={<CommunityEducator />} />
        <Route path="training_module" element={<NewTraining />} />
        <Route
          path="student_progress_report"
          element={<StudentProgressReport />}
        />
        <Route path="details_c.e" element={<EducatorsDetails />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="training_details_c.e" element={<TrainingDetails />} />
        <Route path="assessments_c.e" element={<Assessments />} />
        <Route path="overall_timespent_c.e" element={<OverallTimespent />} />
        <Route path="timespent_details_c.e" element={<TimespentDetails />} />
        <Route path="online_report" element={<OnlineReport />} />
        <Route
          path="timespent_report_modulewise"
          element={<TimeSpentReportModuleWise />}
        />
        <Route path="timespent_report" element={<TimespentReport />} />
      </Route>
      {/* <Route path="*" element={<Route404 />} /> */}
      {/* <Route path="*" element={<Navigate to="/fellow/dashboard" />} /> */}
      {/* <Route
        path="*"
        element={<Navigate to={userType === "mis" ? "/home" : "/"} />}
      /> */}
    </Routes>
  );
};
export default RouteFellow;
