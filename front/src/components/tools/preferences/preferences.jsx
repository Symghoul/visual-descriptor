import React, { useContext } from "react";
import axios from "../../../config/axios";
import AppContext from "../../../context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import theme from "../../../config/theme";
import "./preferences.css";

const Preferences = () => {
  const state = useContext(AppContext);

  let archiveName = "testExport";

  // ----------- Main methods -----------

  const exportData = async () => {
    console.log("exported");
    await axios.get(`/api/export/${archiveName}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="prefContainer">
        <div className="prefItems">
          <Button
            id="btnFile"
            size="small"
            variant="contained"
            color="primary"
            onClick={exportData()}
          >
            Export
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
