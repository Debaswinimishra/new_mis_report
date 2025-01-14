import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteHome from "./RouteHome";
import RouteAnganwadi from "./RouteAnganwadi";
import RouteFellow from "./RouteFellow";
import RouteSchool from "./RouteSchool";
import Route404 from "./Route404";
import RoutePrakashak from "./RoutePrakashak";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Fellow/Dashboard/Dashboard";
import CommonMonthlyQuiz from "../Pages/Fellow/CommonMonthlyQuiz/CommonMonthlyQuiz";
import NewTraining from "../Pages/Fellow/NewTraining/NewTraining";
import StudentProgressReport from "../Pages/Fellow/StudentProgressReport/StudentProgressReport";
import Feedback from "../Pages/Fellow/Feedback/Feedback";
import TrainingDetails from "../Pages/Fellow/TrainingDetails/TrainingDetails";
import Assessments from "../Pages/Fellow/Assessments/Assessments";
import OverallTimespent from "../Pages/Fellow/OverallTimespent/OverallTimespent";
import TimespentDetails from "../Pages/Fellow/TimespentDetails/TimespentDetails";
import AnganwadiRoot from "../Pages/Anganwadi";
import AnganwadiDashboard from "../Pages/Anganwadi/Dashboard/Dashboard";
import SchoolRoot from "../Pages/School";
import SchoolDashboard from "../Pages/School/Dashboard/Dashboard";
import PrakashakDashboard from "../Pages/Prakashak/Dashboard/Dashboard";
import RemoteInstruction from "../Pages/Prakashak/RemoteInstruction/RemoteInstruction";
import WhatsappChatbot from "../Pages/Prakashak/WhatsappChatbot/WhatsappChatbot";
import Schoolwise from "../Pages/Prakashak/Schoolwise/Schoolwise";
import Classwise from "../Pages/Prakashak/Classwise/Classwise";
import PrakashakRoot from "../Pages/Prakashak";
import FellowRoot from "../Pages/Fellow";
import CommunityEducator from "../Pages/Fellow/CommunityEducator/CommunityEducator";
// import EducatorsDetails from "../Pages/Fellow/EducatorsDetails/FellowDetails";
import EducatorsDetails from "../Pages/Fellow/EducatorsDetails/EducatorsDetails";
import ChatbotReports from "../Pages/Fellow/ChatbotReports/ChatbotReports";
import OnlineReport from "../Pages/Fellow/OnlineReport/OnlineReport";
// import { TimeSpentReportModuleWise } from "../Pages/Fellow/TimeSpentReportModuleWise/TimeSpentReportModuleWise";
import TimeSpentReportModuleWise from "../Pages/Fellow/TimeSpentReportModuleWise/TimeSpentReportModuleWise";
import TimespentReport from "../Pages/Fellow/TimespentReport/TimespentReport";
// import DashboardMonthly from "../Pages/Prakashak/Dashboardmonthly/DashboardMonthly";
import Schoolwise_performance from "../Pages/Prakashak/schoolwise_performance/Schoolwise_performance";
import AmazonVouchersRedeemed from "../Pages/Fellow/AmazonVouchersRedeemed/AmazonVouchersRedeemed";
import Retention from "../Pages/Prakashak/Retention/Retention";
import OverallDetails from "../Pages/Prakashak/Overall Details/OverallDetails";
import MonthlyPerformance from "../Pages/Prakashak/Monthly Performance/MonthlyPerformance";
import ActiveParent from "../Pages/Prakashak/ActiveParent/ActiveParent";
import DashboardMonthly from "../Pages/Prakashak/Dashboardmonthly/DashboardMonthly";
import Leaderboard from "../Pages/Fellow/LeaderboardStatus/Leaderboard";
import SchoolwiseNew from "../Pages/Prakashak/Schoolwise/SchoolwiseNew";

function RouteRoot() {
  const userType = localStorage.getItem("usertype");
  const isLoggedin = localStorage.getItem("login");

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {userType === "admin" && (
          <>
            <Route
              path="/fellow"
              element={<PrivateRoute element={<FellowRoot />} />}
            >
              <Route index element={<Dashboard />} />
              <Route path="" element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="common_monthly_quiz"
                element={<CommonMonthlyQuiz />}
              />
              <Route path="overall_c.e" element={<CommunityEducator />} />
              <Route path="training_module" element={<NewTraining />} />
              <Route
                path="student_progress_report"
                element={<StudentProgressReport />}
              />
              <Route path="details_c.e" element={<EducatorsDetails />} />
              <Route path="feedback" element={<Feedback />} />
              <Route
                path="training_details_c.e"
                element={<TrainingDetails />}
              />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="assessments_c.e" element={<Assessments />} />
              <Route
                path="overall_timespent_c.e"
                element={<OverallTimespent />}
              />
              <Route
                path="timespent_details_c.e"
                element={<TimespentDetails />}
              />
              <Route path="online_report" element={<OnlineReport />} />
              <Route path="timespent_report" element={<TimespentReport />} />
              <Route path="chatbot_reports" element={<ChatbotReports />} />
              <Route
                path="timespent_report_modulewise"
                element={<TimeSpentReportModuleWise />}
              />
              <Route
                path="amazon_vouchers_redeemed"
                element={<AmazonVouchersRedeemed />}
              />
            </Route>
            <Route
              path="/anganwadi"
              element={<PrivateRoute element={<AnganwadiRoot />} />}
            >
              <Route index element={<AnganwadiDashboard />} />
              <Route path="dashboard" element={<AnganwadiDashboard />} />
              <Route path="" element={<AnganwadiDashboard />} />
            </Route>
            <Route
              path="/school"
              element={<PrivateRoute element={<SchoolRoot />} />}
            >
              <Route index element={<SchoolDashboard />} />
              <Route path="dashboard" element={<SchoolDashboard />} />
              <Route path="" element={<SchoolDashboard />} />
            </Route>
            <Route
              path="/prakashak"
              element={<PrivateRoute element={<PrakashakRoot />} />}
            >
              <Route index element={<PrakashakDashboard />} />
              <Route path="dashboard" element={<PrakashakDashboard />} />
              <Route path="dashboard_monthly" element={<DashboardMonthly />} />
              <Route
                path="remote_instructions"
                element={<RemoteInstruction />}
              />
              <Route path="whatsapp_chatbot" element={<WhatsappChatbot />} />
              <Route path="school_wise" element={<Schoolwise />} />
              <Route path="overall_details" element={<OverallDetails />} />
              <Route
                path="monthly_performance"
                element={<MonthlyPerformance />}
              />
              <Route
                path="school_wise_performance"
                element={<Schoolwise_performance />}
              />
              <Route path="schoolwiseNew" element={<SchoolwiseNew />} />
              <Route path="active_parents" element={<ActiveParent />} />

              <Route path="class_wise" element={<Classwise />} />
              <Route path="retention_metrics" element={<Retention />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to={isLoggedin ? "/home" : "/"} />}
            />
            {/* <Route path="*" element={<Route404 />} /> */}
          </>
        )}
        {(userType === "mis" || "passcode") && (
          <>
            <Route
              path="/fellow"
              element={<PrivateRoute element={<FellowRoot />} />}
            >
              <Route index element={<Dashboard />} />
              <Route path="" element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="common_monthly_quiz"
                element={<CommonMonthlyQuiz />}
              />
              <Route path="overall_c.e" element={<CommunityEducator />} />
              <Route path="training_module" element={<NewTraining />} />
              <Route
                path="student_progress_report"
                element={<StudentProgressReport />}
              />
              <Route path="details_c.e" element={<EducatorsDetails />} />
              <Route path="feedback" element={<Feedback />} />
              <Route
                path="training_details_c.e"
                element={<TrainingDetails />}
              />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="assessments_c.e" element={<Assessments />} />
              <Route
                path="overall_timespent_c.e"
                element={<OverallTimespent />}
              />
              <Route
                path="timespent_report_modulewise"
                element={<TimeSpentReportModuleWise />}
              />
              <Route
                path="timespent_details_c.e"
                element={<TimespentDetails />}
              />
              <Route
                path="amazon_vouchers_redeemed"
                element={<AmazonVouchersRedeemed />}
              />
            </Route>
            <Route path="timespent_report" element={<TimespentReport />} />
            <Route
              path="/anganwadi"
              element={<PrivateRoute element={<AnganwadiRoot />} />}
            >
              <Route index element={<AnganwadiDashboard />} />
              <Route path="dashboard" element={<AnganwadiDashboard />} />
              <Route path="" element={<AnganwadiDashboard />} />
            </Route>
            <Route
              path="/school"
              element={<PrivateRoute element={<SchoolRoot />} />}
            >
              <Route index element={<SchoolDashboard />} />
              <Route path="dashboard" element={<SchoolDashboard />} />
              <Route path="" element={<SchoolDashboard />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to={isLoggedin ? "/home" : "/"} />}
            />
          </>
        )}
        {userType === "prakashak" && (
          <>
            <Route path="/prakashak" element={<PrakashakRoot />}>
              {/* <Route
                path="/*"
                element={<Navigate to="/prakashak/dashboard" />}
              /> */}
              <Route index element={<PrakashakDashboard />} />
              <Route path="dashboard" element={<PrakashakDashboard />} />
              <Route path="dashboard_monthly" element={<DashboardMonthly />} />
              <Route
                path="remote_instructions"
                element={<RemoteInstruction />}
              />
              <Route path="whatsapp_chatbot" element={<WhatsappChatbot />} />
              <Route path="school_wise" element={<Schoolwise />} />
              <Route path="overall_details" element={<OverallDetails />} />
              <Route
                path="monthly_performance"
                element={<MonthlyPerformance />}
              />
              <Route path="active_parents" element={<ActiveParent />} />
              <Route path="dashboard_monthly" element={<DashboardMonthly />} />
              <Route
                path="school_wise_performance"
                element={<Schoolwise_performance />}
              />
              <Route path="schoolwiseNew" element={<SchoolwiseNew />} />
              <Route path="retention_metrics" element={<Retention />} />
              <Route path="class_wise" element={<Classwise />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to={isLoggedin ? "/home" : "/"} />}
            />
          </>
        )}
        <Route
          path="/*"
          element={<Navigate to={isLoggedin ? "/home" : "/"} />}
        />
      </Routes>
    </>
  );
}

export default RouteRoot;
