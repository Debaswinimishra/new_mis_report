import React from "react";
import AppRoute from "./Route/AppRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function App() {
  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppRoute />
      </ThemeProvider>
    </div>
  );
}
