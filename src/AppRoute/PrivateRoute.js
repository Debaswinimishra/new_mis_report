import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isLoggedin = localStorage.getItem("login");

  if (isLoggedin === "true") {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
