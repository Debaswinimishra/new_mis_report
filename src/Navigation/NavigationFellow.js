import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import FellowDashboard from "../pages/Fellow/FellowDashboard/FellowDashboard";
import FellowDetails from "../pages/Fellow/FellowDetailsPage/FellowDetails";
import NewTraining from "../pages/Fellow/TeacherTrainingModule/NewTraining";
import ComunityEducator from "../pages/Fellow/communityEducator/ComunityEducator";
import Login from "../pages/LoginPage/Login";

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
          <div>
            <Link to="/communityeducator">Community Educators</Link>
          </div>
        </div>
        <div className="right-div">
          <Routes>
            <Route index element={<FellowDashboard />} />
            <Route path="fellowdetails" element={<FellowDetails />} />
            <Route path="trainingmodule" element={<NewTraining />} />
            <Route path="communityeducator" element={<ComunityEducator />} />
            {/* <Route path="/" element={<Login />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default NavigationFellow;
