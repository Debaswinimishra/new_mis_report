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
import DashboardMonthly from "../Pages/Prakashak/Dashboardmonthly/DashboardMonthly";

const RoutePrakashak = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/prakashak"
        element={<PrivateRoute element={<PrakashakRoot />} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard_monthly" element={<DashboardMonthly />} />
        <Route path="remote_instructions" element={<RemoteInstruction />} />
        <Route path="whatsapp_chatbot" element={<WhatsappChatbot />} />
        <Route path="school_wise" element={<Schoolwise />} />
        <Route path="class_wise" element={<Classwise />} />
      </Route>
      <Route path="*" element={<Route404 />} />

      {/* <Route>
        <Route path="/prakashak/dashboard" element={<PrakashakRoot />} />
        <Route
          path="/prakashak/remote_instructions"
          element={<RemoteInstruction />}
        />
        <Route
          path="/prakashak/whatsapp_chatbot"
          element={<WhatsappChatbot />}
        />
        <Route path="/prakashak/school_wise" element={<Schoolwise />} />
        <Route path="/prakashak/class_wise" element={<Classwise />} />

        <Route path="*" element={<Navigate to="/prakashak/dashboard" />} />
      </Route> */}
    </Routes>
  );
};

export default RoutePrakashak;
