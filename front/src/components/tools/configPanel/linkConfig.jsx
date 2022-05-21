import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme, CssTextField } from "../../../config/theme";
import { Button, TextField } from "@mui/material";

import "./linkConfig.css";
import AppContext from "../../../context/AppContext";

const LinkConfig = () => {
  const state = useContext(AppContext);

  const [delay, setDelay] = useState("");
  const [loss, setLoss] = useState("");
  const [bandwith, setBandwith] = useState("");

  /**
   * Fill the editable fields
   */
  useEffect(() => {
    if (state.selectedDevice !== null) {
      const device = state.getDevice(state.selectedDevice);

      setDelay(device.delay);
      setLoss(device.loss);
      setBandwith(device.setBandwith);
    }
  }, [state.selectedDevice]);

  return (
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
          id="linkBandwith"
          value={bandwith}
          onChange={(event) => setBandwith(event.target.value)}
          label={"Bandwith"}
        />
      </div>

      <div className="btn">
        <Button
          onClick={() => {
            state.deleteDevice();
          }}
        >
          Delete Link
        </Button>
      </div>
    </div>
  );
};

export default LinkConfig;
