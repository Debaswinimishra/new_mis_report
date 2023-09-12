import { Routes, Route } from "react-router-dom";
import SchoolRoot from "../pages/School";
import SchoolDashboard from "../pages/School/SchoolDashboard/SchoolDashboard";

const RouteSchool = () => {
  return (
    <Routes>
      <Route path="/school" element={<SchoolRoot />}>
        <Route path="" element={<SchoolDashboard />} />
        {/* <Route path="module7" element={<Module7 />} />
        <Route path="module8" element={<Module8 />} />
        <Route path="module9" element={<Module9 />} /> */}
      </Route>
    </Routes>
  );
};
export default RouteSchool;
