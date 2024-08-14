import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Swal from "sweetalert2";
import "./login.css";

import { getAuthenticateUser } from "../../Pages/Login/LoginApi";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const authentication = async () => {
    try {
      const response = await getAuthenticateUser(userId, password);
      console.log("response--->", response?.data, response?.status);
      const { usertype, approvalStatus } = response?.data;

      if (response?.status === 200) {
        if (approvalStatus === "approved") {
          localStorage.setItem("login", true);
          localStorage.setItem("usertype", usertype);
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1000,
          });

          if (
            usertype === "admin" ||
            usertype === "mis" ||
            usertype === "prakashak"
          ) {
            navigate("/home");
          } else {
            navigate("/");
          }
        } else {
          Swal.fire({
            icon: "info",
            title: "Approval Required",
            text: "You are not approved yet.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid ID or Password",
          text: "Please Enter Valid ID and Password",
        });
      }
    } catch (err) {
      console.log("err--->", err.response);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId.trim() || !password.trim()) {
      alert("Please fill in both fields.");
      return;
    }
    authentication();
  };

  useEffect(() => {
    const isLoggedin = localStorage.getItem("login");
    if (isLoggedin === "true") {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-div">
        <form onSubmit={handleSubmit}>
          <div className="logo">
            <img
              src="https://thinkzone.in/wp-content/uploads/2022/06/Instagram-1-1-1-1-2.png"
              width="85"
              height="85"
              alt="ThinkZone Logo"
              className="logo-image"
            />
          </div>
          <div className="title">Welcome!</div>
          <div className="description">
            ThinkZone is a social enterprise that works towards improving the
            learning outcomes of children from under-resourced communities.
          </div>
          <div className="fields">
            <div className="username">
              <input
                type="text"
                className="user-input"
                placeholder="Username"
                value={userId}
                onChange={handleUserIdChange}
              />
            </div>
            <div className="password">
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                className="pass-input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="eye-button"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="signin-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
