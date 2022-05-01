import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

import "./link.css";

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
  const [txtSource, setTxtSource] = useState("");
  const [txtDest, setTxtDest] = useState("");
  const [txtDelay, setTxtDelay] = useState("");
  const [txtLoss, setTxtLoss] = useState("");
  const [txtBandwith, setTxtBandwith] = useState("");

  return (
    <div className="container">
      <div className="field">
        <CssTextField
          id="linkName_txtfield"
          value={txtName}
          onChange={(event) => setTxtName(event.target.value)}
          label={"Link Name"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkSource_txtField"
          value={txtSource}
          onChange={(event) => setTxtSource(event.target.value)}
          label={"Source"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkDestiny_txtfield"
          value={txtDest}
          onChange={(event) => setTxtDest(event.target.value)}
          label={"Destiny"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkDelay_txtfield"
          value={txtDelay}
          onChange={(event) => setTxtDelay(event.target.value)}
          label={"Delay (ms)"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkLoss_txtfield"
          value={txtLoss}
          onChange={(event) => setTxtLoss(event.target.value)}
          label={"Loss %"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkBandwith_txtfield"
          value={txtBandwith}
          onChange={(event) => setTxtBandwith(event.target.value)}
          label={"Bandwith"}
        />
      </div>
    </div>
  );
}

export default ConfigPanel;
