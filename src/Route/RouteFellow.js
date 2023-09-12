import { Routes, Route } from "react-router-dom";
import FellowDashboard from "../pages/Fellow/FellowDashboard/FellowDashboard";
import NewTraining from "../pages/Fellow/TeacherTrainingModule/NewTraining";
import FellowDetails from "../pages/Fellow/FellowDetailsPage/FellowDetails";
import FellowRoot from "../pages/Fellow";

const RouteFellow = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<FellowDashboard />} />
      <Route path="/trainingmodule" element={<NewTraining />} />
      <Route path="/fellowdetails" element={<FellowDetails />} />
      <Route path="/fellow" element={<FellowRoot />} />
    </Routes>
  );
};
export default RouteFellow;
