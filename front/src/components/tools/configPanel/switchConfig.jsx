import React, { useEffect, useContext, useState, useRef } from "react";
import { Button, Autocomplete, ThemeProvider } from "@mui/material";
import { theme, CssTextField } from "../../../config/theme";
import "./switchConfig.css";
import AppContext from "../../../context/AppContext";

const SwitchConfig = () => {
  const state = useContext(AppContext);

  const [name, setName] = useState("");
  const protocol = useRef("");
  const [port, setPort] = useState("");
  const [mac, setMac] = useState("");

  /**
   * Fill the editable fields
   */
  useEffect(() => {
    if (state.selectedDevice !== null) {
      const device = state.getDevice(state.selectedDevice);
      setName(device.name);
      protocol.current = device.protocol;
      setPort(device.port);
      setMac(device.mac);
    }
  }, [state.selectedDevice]);

  /**
   * handle name change
   */
  useEffect(() => {
    let oldSwitche = state.getDevice(state.selectedDevice);
    let update = { ...oldSwitche, name };

    const arr = state.switches.map((switche) => {
      if (switche.id === oldSwitche.id) {
        return update;
      }
      return switche;
    });

    state.setSwitches(arr);
  }, [name]);

  /**
   * handle port change
   */
  useEffect(() => {
    let oldSwitche = state.getDevice(state.selectedDevice);
    let update = { ...oldSwitche, port };

    const arr = state.switches.map((switche) => {
      if (switche.id === oldSwitche.id) {
        return update;
      }
      return switche;
    });

    state.setSwitches(arr);
  }, [port]);

  /**
   * handle mac change
   */
  useEffect(() => {
    let oldSwitche = state.getDevice(state.selectedDevice);
    let update = { ...oldSwitche, mac };

    const arr = state.switches.map((switche) => {
      if (switche.id === oldSwitche.id) {
        return update;
      }
      return switche;
    });

    state.setSwitches(arr);
  }, [mac]);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="field">
          <CssTextField
            id="switchName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            label={"Switch Name"}
          />
        </div>

        <div className="field">
          <CssTextField
            disabled
            id="switchProtocol"
            value={protocol.current}
            label={"Protocol"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="switchPort"
            value={port}
            onChange={(event) => setPort(event.target.value)}
            label={"Port"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="switchMac"
            value={mac}
            onChange={(event) => setMac(event.target.value)}
            label={"MAC Address"}
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
            Delete Switch
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SwitchConfig;
