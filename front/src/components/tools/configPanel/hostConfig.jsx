import React, { useContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button } from "@mui/material";
import AppContext from "../../../context/AppContext";
import "./hostConfig.css";

const HostConfig = () => {
  const state = useContext(AppContext);

  const [name, setName] = useState("");
  const [ip, setIP] = useState("");
  const [subNetMask, setSubNetMask] = useState("");
  const [mac, setMac] = useState("");

  /**
   * Fill the editable fields
   */
  useEffect(() => {
    if (state.selectedDevice !== null) {
      const device = state.getDevice(state.selectedDevice);
      setName(device.name);
      setIP(device.ip);
      setSubNetMask(device.mask);
      setMac(device.mac);
    }
  }, [state.selectedDevice]);

  /**
   * handle name change
   */
  useEffect(() => {
    let oldHost = state.getDevice(state.selectedDevice);
    let update = { ...oldHost, name };

    const arr = state.hosts.map((host) => {
      if (host.id === oldHost.id) {
        return update;
      }
      return host;
    });

    state.setHosts(arr);
  }, [name]);

  /**
   * handle ip change
   */
  useEffect(() => {
    let oldHost = state.getDevice(state.selectedDevice);
    let update = { ...oldHost, ip };

    const arr = state.hosts.map((host) => {
      if (host.id === oldHost.id) {
        return update;
      }
      return host;
    });

    state.setHosts(arr);
  }, [ip]);

  /**
   * handle subNetMask change
   */
  useEffect(() => {
    let oldHost = state.getDevice(state.selectedDevice);
    let update = { ...oldHost, subNetMask };

    const arr = state.hosts.map((host) => {
      if (host.id === oldHost.id) {
        return update;
      }
      return host;
    });

    state.setHosts(arr);
  }, [subNetMask]);

  /**
   * handle mac change
   */
  useEffect(() => {
    let oldHost = state.getDevice(state.selectedDevice);
    let update = { ...oldHost, mac };

    const arr = state.hosts.map((host) => {
      if (host.id === oldHost.id) {
        return update;
      }
      return host;
    });

    state.setHosts(arr);
  }, [mac]);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="field">
          <CssTextField
            id="hostName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            label={"Host Name"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="hostIp"
            value={ip}
            onChange={(event) => setIP(event.target.value)}
            label={"IP Adress"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="hostSubMask"
            value={subNetMask}
            onChange={(event) => setSubNetMask(event.target.value)}
            label={"Subnet Mask"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="hostMac"
            value={mac}
            onChange={(event) => setMac(event.target.value)}
            label={"Mac Address"}
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
            Delete Host
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HostConfig;
