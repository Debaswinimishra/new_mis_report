import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
// import { getAuthenticateUser } from "../../AllApi/LoginApi";
import { getAuthenticateUser } from "../../Pages/Login/LoginApi";

import Swal from "sweetalert2";

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
            timer: 1000, // Close the alert after 1.5 seconds
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
      // setManagerArr(response.data.resData);
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
    // Input validation: Check if either of the fields is empty
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
    <div>
      <style>
        {`
          
          .eye-button {
            position: absolute;
            top: 50%;
            left: 90px;
            transform: translateY(-50%);
            border: none;
            background-color: transparent;
            // font-size: 16px;
            color: ${showPassword ? "#0074e4" : "#ccc"};
            cursor: pointer;
          }
          // @media (max-width: 600px) {
          //   .pass-input {
          //     padding-right: 45px; /* Increase padding-right to accommodate the button */
          //   }
          //   .eye-button {
          //     right: 5px; /* Adjust button position for smaller screens */
          //     font-size: 14px; /* Adjust button size for smaller screens */
          //   }
          // }
        `}
      </style>

      <div
        style={{
          // background:
          //   "linear-gradient(to bottom, #000000, #000000 0%, #0074e4 100%, #0074e4)",
          background: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          className="login-div"
          style={{
            maxWidth: "500px",
            width: "90%",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#ffffff",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="logo" style={{ textAlign: "center" }}>
              <img
                src="https://thinkzone.in/wp-content/uploads/2022/06/Instagram-1-1-1-1-2.png"
                width="85"
                height="85"
                alt="ThinkZone Logo"
                style={{
                  maxWidth: "95px",
                  maxHeight: "95px",
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div
              className="title"
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "5px",
                fontStyle: "inherit",
              }}
            >
              Welcome!
            </div>
            <div
              style={{
                marginTop: "15px",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                fontStyle: "normal",
                color: "#36454F",
              }}
            >
              ThinkZone is a social enterprise that works towards improving the
              learning outcomes of children from under-resourced communities.
            </div>
            <div className="fields" style={{ marginTop: "35px" }}>
              <div className="username" style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  className="user-input"
                  placeholder="Username"
                  value={userId}
                  onChange={handleUserIdChange}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div className="password" style={{ position: "relative" }}>
                <input
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  className="pass-input"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                    paddingRight: "40px", // Add padding to the right to accommodate the button
                  }}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={toggleShowPassword}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10",
                    transform: "translateY(-50%)",
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "16px",
                    color: showPassword ? "#0074e4" : "#ccc",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? (
                    <VisibilityRoundedIcon />
                  ) : (
                    <VisibilityOffRoundedIcon />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="signin-button"
              style={{
                background: "linear-gradient(to bottom, #0074e4, #00a1e9)",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "15px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                width: "101%",
                marginRight: "0%",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
