import React, {useState} from "react";
import { styled } from '@mui/material/styles';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from "@mui/material";

import "./router.css";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#001e86',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#6a6fea',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#2E44B7',
    },
    '&:hover fieldset': {
      borderColor: '#6a6fea',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#001e86',
    },
  },
});

function ConfigPanel() {

  const [txtName, setTxtName] = useState("");
  const [txtPort, setTxtPort] = useState("");
  const [txtIP, setTxtIP] = useState("");

  const controllerTypes = [
    {label: "Ovs-Controller"},
  ];
  return (
    <div className="container">
      <div className="field">      
      <CssTextField
        id="cntrlName_txtfield"
        value={txtName}
        onChange={(event) => setTxtName(event.target.value)}
        label={"Controller Name"}
        />
      </div>
      
      <div className="field" >      
      <CssTextField
        id="cntrlPort_txtfield"
        value={txtPort}
        onChange={(event) => setTxtPort(event.target.value)}
        label={"Port Number"}
      />
      </div>

      <div className="field">
      <Autocomplete
        id="cntrlType"
        disablePortal
        options={controllerTypes}
        color="primary"
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Controller Type" />}
        />  
      </div>

      
      <div className="field">
      <CssTextField
        id="cntrlIp_txtField"
        value={txtIP}
        onChange={(event) => setTxtIP(event.target.value)}
        label={"IP Adress"}
        />
      </div>
           

    </div>
  );
}

export default ConfigPanel;
