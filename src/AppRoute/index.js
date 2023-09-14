import RouteHome from "./RouteHome";
import RouteAnganwadi from "./RouteAnganwadi";
import RouteFellow from "./RouteFellow";
import RouteSchool from "./RouteSchool";
import Route404 from "./Route404";

function RouteRoot() {
  return (
    <>
      <RouteHome />
      <RouteAnganwadi />
      <RouteFellow />
      <RouteSchool />
      {/* <Route404 /> */}
    </>
  );
}

export default RouteRoot;
