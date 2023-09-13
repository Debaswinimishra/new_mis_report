import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { getAuthenticateUser } from "../../AllApi/LoginApi";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const authentication = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      userid: userId,
      password: password,
      usertype: "manager",
      loginType: "password",
    };

    console.log("body-->", body);

    // try {
    //   const res = await axios.post(
    //     "https://thinkzone.in.net/thinkzone/authenticateuser",
    //     body,
    //     config
    //   );
    //   if (res.data.status === "success") {
    //     localStorage.setItem("login", true);
    //     navigate("/home/dashboard");
    //   } else {
    //     alert("Login Failed");
    //   }
    // } catch (error) {
    //   alert("Login Failed");
    // }
    try {
      const response = await getAuthenticateUser(body, config);
      console.log("response--->", response.data, response.status);
      if (response.data.status === "success") {
        localStorage.setItem("login", true);
        // navigate("/home/dashboard");
        navigate("/home");
      } else {
        alert("Please Enter Valid ID and Password");
      }
      // setManagerArr(response.data.resData);
    } catch (err) {
      console.log("err--->", err.response.status);
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
      <div
        style={{
          //
          background:
            "linear-gradient(to bottom, #000000, #000000 50%, #0074e4 50%, #0074e4)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="login-div"
          style={{
            maxWidth: "500px", // Limit the width for responsiveness
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Box shadow for a box-like structure
            backgroundColor: "#ffffff", // Background color of the login box
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="logo">
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
                  // background: "linear-gradient(to bottom, #0074e4, #00a1e9)",
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
              // className="sub-title"
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
              <div
                className="username"
                style={{
                  marginBottom: "15px",
                }}
              >
                <input
                  type="text"
                  className="user-input"
                  placeholder="Username"
                  value={userId}
                  onChange={handleUserIdChange}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "90%",
                    padding: "10px",
                  }}
                />
              </div>
              <div
                className="password"
                style={{ flex: 1, flexDirection: "row" }}
              >
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
                    width: "90%",
                    padding: "10px",
                  }}
                />

                {/* <button
                  type="button"
                  className="eye-button"
                  onClick={toggleShowPassword}
                  style={{
                    border: "0px",
                    backgroundColor: "transparent",
                    fontSize: "10px",
                    // marginTop: "40px",
                    color: "#000", // Customize the color as needed
                  }}
                >
                  {showPassword ? (
                    <span className="material-icons">
                      <VisibilityRoundedIcon />
                    </span>
                  ) : (
                    <span className="material-icons">
                      <VisibilityOffRoundedIcon />
                    </span>
                  )}
                </button> */}
                <button
                  type="button"
                  className="eye-button"
                  onClick={toggleShowPassword}
                  style={{
                    border: "0px",
                    backgroundColor: "transparent",
                    fontSize: "16px", // Increase the font size for better visibility
                    color: showPassword ? "#0074e4" : "#ccc", // Change color when password is shown or hidden
                    marginLeft: "-30px", // Adjust the margin to position it better
                    cursor: "pointer",
                    position: "relative", // Add position property for better control
                    zIndex: 1, // Add z-index to make it appear on top of the input field
                  }}
                >
                  {showPassword ? (
                    <span className="material-icons">
                      <VisibilityRoundedIcon />
                    </span>
                  ) : (
                    <span className="material-icons">
                      <VisibilityOffRoundedIcon />
                    </span>
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
                width: "95%",
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
