import { Routes, Route } from "react-router-dom";
import AnganwadiDashboard from "../pages/Anganwadi/AnganwadiDashboard/AnganwadiDashboard";
import AnganwadiRoot from "../pages/Anganwadi";

const RouteAnganwadi = () => {
  return (
    <Routes>
      <Route path="/anganwadi" element={<AnganwadiRoot />}>
        <Route path="" element={<AnganwadiDashboard />} />
      </Route>
    </Routes>
  );
};
export default RouteAnganwadi;
