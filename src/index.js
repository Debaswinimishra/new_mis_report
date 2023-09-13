// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { StyledEngineProvider } from "@mui/material/styles";
// import { BrowserRouter as Router } from "react-router-dom";
// import "./index.css";
// import App from "./App";

// ReactDOM.createRoot(document.querySelector("#root")).render(
//   <React.StrictMode>
//     <StyledEngineProvider injectFirst>
//       <Router>
//         <App />
//       </Router>
//     </StyledEngineProvider>
//   </React.StrictMode>
// );

import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
