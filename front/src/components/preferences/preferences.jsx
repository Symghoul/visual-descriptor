import { Button } from "@mui/material";
import React from "react";
import "./preferences.css";

function Preferences() {
  return (
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
  );
}

export default Preferences;