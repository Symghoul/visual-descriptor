import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import "./preferences.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6a6fea",
      main: "#2E44B7",
      dark: "#001e86",
      contrastText: "#ffffff",
    },
  },
});

function Preferences() {
  return (
    <ThemeProvider theme={theme}>
      <div className="prefContainer">
        <div className="prefItems">
          <Button
            id="btnFile"
            font
            size="small"
            variant="contained"
            color="primary"
          >
            File
          </Button>
        </div>
        <div className="prefItems">
          <Button
            id="btnOptions"
            size="small"
            variant="contained"
            color="primary"
          >
            Options
          </Button>
        </div>
        <div className="prefItems">
          <Button id="btnBack" size="small" variant="contained" color="primary">
            Undo
          </Button>
        </div>
        <div className="prefItems">
          <Button
            id="btnAhead"
            size="small"
            variant="contained"
            color="primary"
          >
            Redo
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Preferences;
