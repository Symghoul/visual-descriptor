import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

import "./switch.css";

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

  return (
    <div className="container">
      <div className="field">
        <CssTextField
          id="switchName_txtfield"
          value={txtName}
          onChange={(event) => setTxtName(event.target.value)}
          label={"Switch Name"}
        />
      </div>
    </div>
  );
}

export default ConfigPanel;
