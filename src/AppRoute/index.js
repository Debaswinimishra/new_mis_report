import RouteHome from "./RouteHome";
import RouteAnganwadi from "./RouteAnganwadi";
import RouteFellow from "./RouteFellow";
import RouteSchool from "./RouteSchool";
import Route404 from "./Route404";
import RoutePrakashak from "./RoutePrakashak";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function RouteRoot() {
  const Navigate = useNavigate();
  const userType = localStorage.getItem("usertype");
  console.log("userType", userType);
  return (
    <>
      {userType === "mis" && (
        <>
          <RouteHome />
          <RouteAnganwadi />
          <RouteFellow />
          <RouteSchool />

          {/* <RoutePrakashak /> */}
        </>
      )}
      {userType === "admin" && (
        <>
          <RouteHome />
          <RouteAnganwadi />
          <RouteFellow />
          <RouteSchool />
          <RoutePrakashak />
        </>
      )}
      {userType === "prakashak" && (
        <>
          <RouteHome />
          <RoutePrakashak />
        </>
      )}
      {/* <Route path="*" element={<Navigate to="/home" />} /> */}
      {/* <Route404 /> */}
    </>
  );
}

export default RouteRoot;
