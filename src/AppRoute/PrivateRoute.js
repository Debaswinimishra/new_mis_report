import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isLoggedin = localStorage.getItem("login");
  const userType = localStorage.getItem("usertype");

  if (isLoggedin === "true") {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
