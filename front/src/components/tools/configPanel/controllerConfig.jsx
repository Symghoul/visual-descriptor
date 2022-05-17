import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { styled } from "@mui/material/styles";
import { Autocomplete, Button, TextField } from "@mui/material";

import "./controllerConfig.css";

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

function ControllerConfig() {
  const state = useContext(AppContext);

  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [ip, setIP] = useState("");
  const [cntrlType, setCntrlType] = useState("");

  useEffect(() => {
    const device = state.selectedDevice;
    if (device !== null) {
      setName(device.name);
      setPort(device.port);
      setIP(device.ip);
    }
  }, [state.selectedDevice]);

  const handleUpdate = (nName) => {
    setName(nName);
    //state.updateControllerName(state.selectedDevice, name);
    const controllerNameUpdt = state.controllers.map((controller) => {
      if (controller.id === state.selectedDevice.id) {
        return {
          ...controller,
          name: nName,
        };
      }
      state.setControllers(controllerNameUpdt);
    });
  };

  const controllerTypes = ["Ovs-Controller", "NOX", "Remote Controller", "Ryu"];

  //const handleName = (e) => {
  //  setName(e.event.target.value);
  //  const controllerNameUpdt = state.controllers.map((controller) => {
  //    if (controller.id === id) {
  //      return {
  //        ...controller,
  //        name: name,
  //      };
  //    }
  //    state.setControllers(controllerNameUpdt);
  //  });
  //};

  return (
    <div className="container">
      <div className="field">
        <CssTextField
          id="cntrlName"
          value={name}
          onChange={(event) => handleUpdate(event.target.value)}
          label={"Controller Name"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="cntrlPort"
          value={port}
          onChange={(event) => setPort(event.target.value)}
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
          renderInput={(params) => (
            <TextField {...params} label="Controller Type" />
          )}
        />
      </div>

      <div className="field">
        <CssTextField
          id="cntrlIp"
          value={ip}
          onChange={(event) => setIP(event.target.value)}
          label={"IP Adress"}
        />
      </div>
      <div className="btn">
        <Button
          onClick={() => {
            state.deleteDevice();
          }}
        >
          Delete Controller
        </Button>
      </div>
    </div>
  );
}

export default ControllerConfig;
