import RouteHome from "./RouteHome";
import RouteAnganwadi from "./RouteAnganwadi";
import RouteFellow from "./RouteFellow";
import RouteSchool from "./RouteSchool";
import Route404 from "./Route404";

function RouteRoot() {
  return (
    <div>
      <RouteHome />
      <RouteAnganwadi />
      <RouteFellow />
      <RouteSchool />
      {/* <Route404 /> */}
    </div>
  );
}

export default RouteRoot;
