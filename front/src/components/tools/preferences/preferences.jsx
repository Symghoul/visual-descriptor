import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
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

const Preferences = () => {
  const state = useContext(AppContext);

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
            onClick={state.exportData()}
          >
            Save
          </Button>
        </div>
        <div className="prefItems">
          <Button
            id="btnOptions"
            size="small"
            variant="contained"
            color="primary"
            onClick={state.testStuff()}
          >
            Load
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Preferences;
