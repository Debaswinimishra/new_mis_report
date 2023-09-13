import { Routes, Route } from "react-router-dom";
import FellowDashboard from "../pages/Fellow/FellowDashboard/FellowDashboard";
import NewTraining from "../pages/Fellow/TeacherTrainingModule/NewTraining";
import FellowDetails from "../pages/Fellow/FellowDetailsPage/FellowDetails";
import FellowRoot from "../pages/Fellow";
import ComunityEducator from "../pages/Fellow/communityEducator/ComunityEducator";
import Login from "../pages/LoginPage/Login";

const RouteFellow = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<FellowDashboard />} />
      <Route path="/trainingmodule" element={<NewTraining />} />
      <Route path="/communityeducator" element={<ComunityEducator />} />
      <Route path="/fellowdetails" element={<FellowDetails />} />
      <Route path="/fellow" element={<FellowRoot />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
export default RouteFellow;
