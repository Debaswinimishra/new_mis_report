// import RouteHome from "./RouteHome";
// import RouteAnganwadi from "./RouteAnganwadi";
// import RouteFellow from "./RouteFellow";
// import RouteSchool from "./RouteSchool";
// import Route404 from "./Route404";
// import RoutePrakashak from "./RoutePrakashak";

// function RouteRoot() {
//   return (
//     <>
//       <RouteHome />
//       <RouteAnganwadi />
//       <RouteFellow />
//       <RouteSchool />
//       <RoutePrakashak />
//       {/* <Route404 /> */}
//     </>
//   );
// }

// export default RouteRoot;

import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteHome from "./RouteHome";
import RouteAnganwadi from "./RouteAnganwadi";
import RouteFellow from "./RouteFellow";
import RouteSchool from "./RouteSchool";
import Route404 from "./Route404";
import RoutePrakashak from "./RoutePrakashak";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";

function RouteRoot() {
  // const [userType, setUserType] = useState("");
  const userType = localStorage.getItem("usertype");
  // useEffect(() => {
  //   const storedUserType = localStorage.getItem("usertype");
  //   setUserType(storedUserType);
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      {userType === "admin" && (
        <>
          {/* <RouteHome /> */}
          <RouteAnganwadi />
          <RouteFellow />
          <RouteSchool />
          <RoutePrakashak />
        </>
      )}
      {userType === "mis" && (
        <>
          {/* <RouteHome /> */}
          <RouteAnganwadi />
          <RouteFellow />
          <RouteSchool />
        </>
      )}
      {userType === "prakashak" && (
        <>
          <RoutePrakashak />
        </>
      )}
      {/* {!userType && <Navigate to="/login" />} */}
      {/* <Route path="*" element={<Route404 />} /> */}
    </>
  );
}

export default RouteRoot;
