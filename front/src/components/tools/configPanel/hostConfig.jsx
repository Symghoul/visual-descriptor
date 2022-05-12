import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

import "./hostConfig.css";

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

function HostConfig() {
  const [name, setName] = useState("");
  const [ip, setIP] = useState("");
  const [subNetMask, setSubNetMask] = useState("");
  const [mac, setMac] = useState("");

  return (
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
    </div>
  );
}

export default HostConfig;
