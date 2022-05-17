import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

import "./linkConfig.css";
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

const LinkConfig = () => {
  const state = useContext(AppContext);

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [destiny, setDestiny] = useState("");
  const [delay, setDelay] = useState("");
  const [loss, setLoss] = useState("");
  const [bandwith, setBandwith] = useState("");

  return (
    <div className="container">
      <div className="field">
        <CssTextField
          id="linkName"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label={"Link Name"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkSource"
          value={source}
          onChange={(event) => setSource(event.target.value)}
          label={"Source"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkDestiny"
          value={destiny}
          onChange={(event) => setDestiny(event.target.value)}
          label={"Destiny"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkDelay"
          value={delay}
          onChange={(event) => setDelay(event.target.value)}
          label={"Delay (ms)"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkLoss"
          value={loss}
          onChange={(event) => setLoss(event.target.value)}
          label={"Loss %"}
        />
      </div>

      <div className="field">
        <CssTextField
          id="linkBandwith"
          value={bandwith}
          onChange={(event) => setBandwith(event.target.value)}
          label={"Bandwith"}
        />
      </div>

      <div className="btn">
        <Button
          onClick={() => {
            state.deleteDevice();
          }}
        >
          Delete Link
        </Button>
      </div>
    </div>
  );
};

export default LinkConfig;
