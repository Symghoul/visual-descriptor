import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { theme, CssTextField } from "../../../config/theme";

import "./controllerConfig.css";

const ControllerConfig = () => {
  const state = useContext(AppContext);

  const [name, setName] = useState("");
  const [ip, setIP] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    if (state.selectedDevice !== null) {
      const device = state.getDevice(state.selectedDevice);
      setName(device.name);
      setPort(device.port);
      setIP(device.ip);
    }
  }, [state.selectedDevice]);

  useEffect(() => {
    let oldController = state.getDevice(state.selectedDevice);
    oldController = { ...oldController, name };

    console.log(oldController);
    const arr = state.controllers.map((cntrl) => {
      if (cntrl.id === oldController.id) {
        return oldController;
      }
      return cntrl;
    });

    state.setControllers(arr);
  }, [name]);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="field">
          <CssTextField
            id="cntrlName"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            label={"Controller Name"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="cntrlIp"
            value={ip}
            onChange={(event) => setIP(event.target.value)}
            label={"IP Adress"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="cntrlPort"
            value={port}
            onChange={(event) => setPort(event.target.value)}
            label={"Port Number"}
          />
        </div>

        <div className="btn">
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => {
              state.deleteDevice();
            }}
          >
            Delete Controller
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ControllerConfig;
