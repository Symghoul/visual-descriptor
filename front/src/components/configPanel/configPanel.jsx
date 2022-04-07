import React, {useState} from "react";
import { Autocomplete, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";

import "./configPanel.css";

function ConfigPanel() {

  const [txtName, setTxtName] = useState("");
  const [txtPort, setTxtPort] = useState("");
  const [txtIP, setTxtIP] = useState("");

  const controllerTypes = [
    {label: "Ovs-Controller"},
  ];

  return (
      <div className="configContainer">
        <div className="labConfiguration">Configuration</div>
        <div className="field">
        <TextField
          required={true}
          value={txtName}
          onChange={(event) => setTxtName(event.target.value)}
          label={"Controller Name"}
        />
        </div>
        <div className="field">
        <TextField
          required={true}
          value={txtPort}
          onChange={(event) => setTxtPort(event.target.value)}
          label={"Port Number"}
        />
        </div>
        <div className="field">
        <Autocomplete
          disablePortal
          id="cmbBoxTypeCtrl"
          options={controllerTypes}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Controller Type" />}
        />  
        </div>
        <div className="field">
        <FormControlLabel 
          control={<Checkbox/>} label="Active"  labelPlacement="start" 
        />
        </div>
        <div className="field">
        <TextField
          required={true}
          value={txtIP}
          onChange={(event) => setTxtIP(event.target.value)}
          label={"IP Adress"}
        />
        </div>
        <div className="field">
          <FormControlLabel control={<Checkbox/>} label="Remote Controller"  labelPlacement="start" />
        </div>
      </div>
  );
}

export default ConfigPanel;
