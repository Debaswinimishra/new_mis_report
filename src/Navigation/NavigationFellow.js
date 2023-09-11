import { Link, Outlet } from "react-router-dom";

function NavigationFellow() {
  return (
    <>
      <div className="container">
        <div className="left-div">
          <div>
            <Link to="">Module1</Link>
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
