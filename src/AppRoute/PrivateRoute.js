import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isLoggedin = localStorage.getItem("login");
  const userType = localStorage.getItem("usertype");

  if (isLoggedin === "true") {
    if (
      userType === "admin" ||
      userType === "mis" ||
      userType === "prakashak"
    ) {
      return element;
    } else {
      // Redirect to unauthorized page for unknown user types
      return <Navigate to="/unauthorized" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
