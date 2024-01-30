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
