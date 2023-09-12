import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import FellowDashboard from "../pages/Fellow/FellowDashboard/FellowDashboard";
import FellowDetails from "../pages/Fellow/FellowDetailsPage/FellowDetails";
import NewTraining from "../pages/Fellow/TeacherTrainingModule/NewTraining";

function NavigationFellow() {
  return (
    <>
      <div className="container">
        <div className="left-div">
          <div>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div>
            <Link to="/fellowdetails">Fellow Details</Link>
          </div>
          <div>
            <Link to="/trainingmodule">Training Module</Link>
          </div>
        </div>
        <div className="right-div">
          <Routes>
            <Route index element={<FellowDashboard />} />
            <Route path="fellowdetails" element={<FellowDetails />} />
            <Route path="trainingmodule" element={<NewTraining />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default NavigationFellow;
