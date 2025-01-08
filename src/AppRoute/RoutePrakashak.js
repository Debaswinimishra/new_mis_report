import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Dashboard from "../Pages/Prakashak/Dashboard/Dashboard";
import RemoteInstruction from "../Pages/Prakashak/RemoteInstruction/RemoteInstruction";
import WhatsappChatbot from "../Pages/Prakashak/WhatsappChatbot/WhatsappChatbot";
import Schoolwise from "../Pages/Prakashak/Schoolwise/Schoolwise";
import Classwise from "../Pages/Prakashak/Classwise/Classwise";
import PrakashakRoot from "../Pages/Prakashak";
import PrivateRoute from "./PrivateRoute";
import Route404 from "./Route404";
// import DashboardMonthly from "../Pages/Prakashak/Dashboardmonthly/DashboardMonthly";
import Schoolwise_performance from "../Pages/Prakashak/schoolwise_performance/Schoolwise_performance";
import Retention from "../Pages/Prakashak/Retention/Retention";
import OverallDetails from "../Pages/Prakashak/Overall Details/OverallDetails";
import MonthlyPerformance from "../Pages/Prakashak/Monthly Performance/MonthlyPerformance";
import ActiveParent from "../Pages/Prakashak/ActiveParent/ActiveParent";
import DashboardMonthly from "../Pages/Prakashak/Dashboardmonthly/DashboardMonthly";
import SchoolwiseNew from "../Pages/Prakashak/Schoolwise/SchoolwiseNew";

const RoutePrakashak = () => {
  const location = useLocation();
  const districtname = localStorage.getItem("districtname");

  return (
    <Routes>
      <Route
        path="/prakashak"
        element={<PrivateRoute element={<PrakashakRoot />} />}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard_monthly" element={<DashboardMonthly />} />
        <Route path="remote_instructions" element={<RemoteInstruction />} />
        <Route path="whatsapp_chatbot" element={<WhatsappChatbot />} />
        <Route path="school_wise" element={<Schoolwise />} />
        <Route path="active_parents" element={<ActiveParent />} />

        <Route
          path="school_wise_performance"
          element={<Schoolwise_performance />}
        />
        <Route path="overall_details" element={<OverallDetails />} />
        <Route path="monthly_performance" element={<MonthlyPerformance />} />
        <Route path="retention_metrics" element={<Retention />} />
        <Route path="schoolwiseNew" element={<SchoolwiseNew />} />

        {/* <Route path="class_wise" element={<Classwise />} /> */}
      </Route>

      <Route path="*" element={<Route404 />} />
    </Routes>
  );
};

export default RoutePrakashak;
