import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

import "./switchConfig.css";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#001e86",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#6a6fea",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2E44B7",
    },
    "&:hover fieldset": {
      borderColor: "#6a6fea",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#001e86",
    },
  },
});

function SwitchConfig() {
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
    </div>
  );
}

export default SwitchConfig;
