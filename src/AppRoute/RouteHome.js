import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

function RouteHome() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default RouteHome;
