import { Routes, Route } from "react-router-dom";
import FellowDashboard from "../pages/Fellow/FellowDashboard/FellowDashboard";
import FellowRoot from "../pages/Fellow";

const RouteFellow = () => {
  return (
    <Routes>
      <Route path="/fellow" element={<FellowRoot />}>
        <Route path="" element={<FellowDashboard />} />
      </Route>
    </Routes>
  );
};
export default RouteFellow;
