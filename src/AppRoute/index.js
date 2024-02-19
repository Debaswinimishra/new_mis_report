import RouteHome from "./RouteHome";
import RouteAnganwadi from "./RouteAnganwadi";
import RouteFellow from "./RouteFellow";
import RouteSchool from "./RouteSchool";
import Route404 from "./Route404";
import RoutePrakashak from "./RoutePrakashak";

function RouteRoot() {
  return (
    <>
      <RouteHome />
      <RouteAnganwadi />
      <RouteFellow />
      <RouteSchool />
      <RoutePrakashak />
      {/* <Route404 /> */}
    </>
  );
}

export default RouteRoot;

// import { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import RouteHome from "./RouteHome";
// import RouteAnganwadi from "./RouteAnganwadi";
// import RouteFellow from "./RouteFellow";
// import RouteSchool from "./RouteSchool";
// import Route404 from "./Route404";
// import RoutePrakashak from "./RoutePrakashak";

// function RouteRoot() {
//   const [userType, setUserType] = useState("");

//   useEffect(() => {
//     const storedUserType = localStorage.getItem("usertype");
//     setUserType(storedUserType);
//   }, []);
//   return (
//     <Routes>
//       <Route path="/" element={<RouteHome />} />
//       {userType === "admin" && (
//         <>
//           <Route path="/Anganwadi" element={<RouteAnganwadi />} />
//           <Route path="/Fellow" element={<RouteFellow />} />
//           <Route path="/School" element={<RouteSchool />} />
//           <Route path="/Prakashak" element={<RoutePrakashak />} />
//         </>
//       )}
//       {userType === "MIS" && (
//         <>
//           <Route path="/Anganwadi" element={<RouteAnganwadi />} />
//           <Route path="/Fellow" element={<RouteFellow />} />
//           <Route path="/School" element={<RouteSchool />} />
//         </>
//       )}
//       {userType === "Prakashak" && (
//         <Route path="/Prakashak" element={<RoutePrakashak />} />
//       )}
//       {!userType && <Navigate to="/login" />}
//       <Route path="*" element={<Route404 />} />
//     </Routes>
//   );
// }

// export default RouteRoot;
