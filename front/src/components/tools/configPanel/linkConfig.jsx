import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button } from "@mui/material";
import AppContext from "../../../context/AppContext";
import "./linkConfig.css";

const LinkConfig = () => {
  const state = useContext(AppContext);

  const [delay, setDelay] = useState("");
  const [loss, setLoss] = useState("");
  const [bandwidth, setBandwidth] = useState("");

  /**
   * Fill the editable fields
   */
  useEffect(() => {
    if (state.selectedDevice !== null) {
      const device = state.getDevice(state.selectedDevice);

      setDelay(device.delay);
      setLoss(device.loss);
      setBandwidth(device.bandwidth);
    }
  }, [state.selectedDevice]);

  /**
   * handle delay change
   */
  useEffect(() => {
    let oldLink = state.getDevice(state.selectedDevice);
    let update = { ...oldLink, delay };

    const arr = state.links.map((link) => {
      if (link.id === oldLink.id) {
        return update;
      }
      return link;
    });

    state.setLinks(arr);
  }, [delay]);

  /**
   * handle loss change
   */
  useEffect(() => {
    let oldLink = state.getDevice(state.selectedDevice);
    let update = { ...oldLink, loss };

    const arr = state.links.map((link) => {
      if (link.id === oldLink.id) {
        return update;
      }
      return link;
    });

    state.setLinks(arr);
  }, [loss]);

  /**
   * handle bandwidth change
   */
  useEffect(() => {
    let oldLink = state.getDevice(state.selectedDevice);
    let update = { ...oldLink, bandwidth };

    const arr = state.links.map((link) => {
      if (link.id === oldLink.id) {
        return update;
      }
      return link;
    });

    state.setLinks(arr);
  }, [bandwidth]);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="field">
          <CssTextField
            id="linkDelay"
            value={delay}
            onChange={(event) => setDelay(event.target.value)}
            label={"Delay (ms)"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="linkLoss"
            value={loss}
            onChange={(event) => setLoss(event.target.value)}
            label={"Loss %"}
          />
        </div>

        <div className="field">
          <CssTextField
            id="linkBandwidth"
            value={bandwidth}
            onChange={(event) => setBandwidth(event.target.value)}
            label={"Bandwidth"}
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
            Delete Link
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LinkConfig;
