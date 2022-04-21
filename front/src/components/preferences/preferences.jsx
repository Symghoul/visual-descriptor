import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import "./preferences.css";

const theme = createTheme({
  palette: {
    primary: {
      light: '#6a6fea',
      main: '#2E44B7',
      dark: '#001e86',
      contrastText: '#ffffff'
    }
  },
});

function Preferences() {
  return (
    <ThemeProvider theme={theme}>
      <div className="prefContainer">
        <Button
          className="btnFile"
          variant="contained"
          color="primary"
        >
          File
        </Button>
        <Button
          className="btnOptions"
          variant="contained"
          color="primary"
          >
          Options
        </Button>
        <Button
          className="btnBack"
          variant="contained"
          color="primary"
          >
          Undo
        </Button>
        <Button
          className="btnAhead"
          variant="contained"
          color="primary"
          >
          Redo
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default Preferences;