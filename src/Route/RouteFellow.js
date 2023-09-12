import { Routes, Route } from "react-router-dom";
import FellowDashboard from "../pages/Fellow/FellowDashboard/FellowDashboard";
import NewTraining from "../pages/Fellow/TeacherTrainingModule/NewTraining";
import FellowDetails from "../pages/Fellow/FellowDetailsPage/FellowDetails";
import FellowRoot from "../pages/Fellow";

const RouteFellow = () => {
  return (
    <Routes>
      <Route path="/fellow" element={<FellowRoot />}>
        <Route path="" element={<FellowDashboard />} />
        <Route path="/fellowdetails" element={<FellowDetails />} />
        {/* <Route path="/trainingmodule" element={<NewTraining />} /> */}
      </Route>
    </Routes>
  );
};
export default RouteFellow;
