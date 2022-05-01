import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

import "./host.css";

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

function ConfigPanel() {
  const [txtName, setTxtName] = useState("");
  const [txtIP, setTxtIP] = useState("");
  const [txtSubNetMask, setTxtSubNetMask] = useState("");
  const [txtMac, setTxtMac] = useState("");

  return (
    <div className="container">
      <div className="field">
        <CssTextField
          id="hostName_txtfield"
          value={txtName}
          onChange={(event) => setTxtName(event.target.value)}
          label={"Host Name"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="hostIp_txtField"
          value={txtIP}
          onChange={(event) => setTxtIP(event.target.value)}
          label={"IP Adress"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="hostSubMask_txtfield"
          value={txtSubNetMask}
          onChange={(event) => setTxtSubNetMask(event.target.value)}
          label={"Subnet Mask"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="hostMac_txtfield"
          value={txtMac}
          onChange={(event) => setTxtMac(event.target.value)}
          label={"Mac Address"}
        />
      </div>
    </div>
  );
}

export default ConfigPanel;
