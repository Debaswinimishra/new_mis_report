import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

function RouteHome() {
  const isLoggedin = localStorage.getItem("login");
  console.log("isLoggedinhome--->", isLoggedin);
  return (
    <>
      <Routes>
        {/* {isLoggedin === true ? ( */}
        <Route path="/home" element={<Home />} />
        {/* ) : ( */}
        <Route path="/" element={<Login />} />
        {/* )} */}
        {/* {!isLoggedin && <Navigate to="/" />} */}
      </Routes>
    </>
  );
}

export default RouteHome;
