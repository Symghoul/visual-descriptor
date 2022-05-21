import React, { useContext, useState } from "react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { CssTextField } from "../../../config/theme";
import "./switchConfig.css";
import AppContext from "../../../context/AppContext";

const SwitchConfig = () => {
  const state = useContext(AppContext);

  const [name, setName] = useState("");
  const [protocol, setProtocol] = useState("");
  const [port, setPort] = useState("");
  const [mac, setMac] = useState("");

  return (
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
          id="switchProtocol"
          value={protocol}
          onChange={(event) => setProtocol(event.target.value)}
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

      <div className="btn">
        <Button
          onClick={() => {
            state.deleteDevice();
          }}
        >
          Delete Switch
        </Button>
      </div>
    </div>
  );
};

export default SwitchConfig;
