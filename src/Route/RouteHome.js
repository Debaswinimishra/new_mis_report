import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";

function RouteRoot() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default RouteRoot;
