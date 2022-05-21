import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { theme, CssTextField } from "../../../config/theme";

import "./controllerConfig.css";

const ControllerConfig = () => {
  const state = useContext(AppContext);

  const [name, setName] = useState("");
  const [ip, setIP] = useState("");
  const [port, setPort] = useState("");
  const [remote, setRemote] = useState(false);

  /**
   * Fill the editable fields
   */
  useEffect(() => {
    if (state.selectedDevice !== null) {
      const device = state.getDevice(state.selectedDevice);
      setName(device.name);
      setPort(device.port);
      setIP(device.ip);
      setRemote(device.remote);
    }
  }, [state.selectedDevice]);

  /**
   * handle name change
   */
  useEffect(() => {
    let oldController = state.getDevice(state.selectedDevice);
    let update = { ...oldController, name };

    const arr = state.controllers.map((controller) => {
      if (controller.id === oldController.id) {
        return update;
      }
      return controller;
    });

    state.setControllers(arr);
  }, [name]);

  /**
   * handle ip change
   */
  useEffect(() => {
    let oldController = state.getDevice(state.selectedDevice);
    let update = { ...oldController, ip };

    const arr = state.controllers.map((controller) => {
      if (controller.id === oldController.id) {
        return update;
      }
      return controller;
    });

    state.setControllers(arr);
  }, [ip]);

  /**
   * handle port change
   */
  useEffect(() => {
    let oldController = state.getDevice(state.selectedDevice);
    let update = { ...oldController, port };

    const arr = state.controllers.map((controller) => {
      if (controller.id === oldController.id) {
        return update;
      }
      return controller;
    });

    state.setControllers(arr);
  }, [port]);

  /**
   * handle remote change
   */
  useEffect(() => {
    let oldController = state.getDevice(state.selectedDevice);
    let update = { ...oldController, remote };

    const arr = state.controllers.map((controller) => {
      if (controller.id === oldController.id) {
        return update;
      }
      return controller;
    });

    state.setControllers(arr);
  }, [remote]);

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

        <div className="field">
          <FormControlLabel
            control={
              <Switch
                checked={remote}
                onChange={(event) => setRemote(event.target.checked)}
              />
            }
            label="Remote"
            labelPlacement="start"
          />
        </div>

        <div className="field">
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
