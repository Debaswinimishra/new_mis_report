import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

function RouteHome() {
  const isLoggedin = localStorage.getItem("login");
  const userType = localStorage.getItem("usertype");
  console.log("userType---->", userType);
  console.log("isLoggedinhome--->", isLoggedin);
  return (
    <>
      <Routes>
        {/* {isLoggedin === true ? ( */}
        <Route path="/home" element={<Home />} />
        {/* ) : ( */}
        <Route path="/" element={<Login />} />

        {/* <Route path="*" element={<Home />} /> */}
        {/* )} */}
        {/* {!isLoggedin && <Navigate to="/" />} */}
      </Routes>
    </>
  );
}

export default RouteHome;
