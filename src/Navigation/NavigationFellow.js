import { Link, Outlet } from "react-router-dom";

function NavigationFellow() {
  return (
    <>
      <div className="container">
        <div className="left-div">
          <div>
            <Link to="">Dashboard</Link>
          </div>
          <div>
            <Link to="fellowdetails">Fellow Details</Link>
          </div>
          <div>
            <Link to="trainingmodule">Training Module</Link>
          </div>
        </div>
        <div className="right-div">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default NavigationFellow;
