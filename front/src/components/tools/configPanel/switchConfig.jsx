import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

import "./switchConfig.css";
import AppContext from "../../../context/AppContext";

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

const SwitchConfig = () => {
  const [name, setName] = useState("");
  const [protocol, setProtocol] = useState("");
  const [port, setPort] = useState("");
  const [mac, setMac] = useState("");

  const state = useContext(AppContext);

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
