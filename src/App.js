import React from "react";
// import AppRoute from "./Route/AppRoute";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import NavigationRoot from "./Navigation/NavigationRoot";

// export default function App() {
//   const theme = createTheme();

//   return (
//     <div>
//       <ThemeProvider theme={theme}>
//         <NavigationRoot />
//         <AppRoute />
//       </ThemeProvider>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import AppRoute from "./AppRoute";
import NavigationRoot from "./Components/Navigation/NavigationRoot";
import "./styles.css";

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("usertype") === null) {
      localStorage.clear();
    }
  }, []);

  return (
    <div className="App">
      {/* <NavigationRoot /> */}
      <AppRoute />
    </div>
  );
}
