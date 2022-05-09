import React, { useContext, useEffect } from "react";
import AppContext from "../../../context/AppContext";
import "./elementsPanel.css";
import { CardMedia } from "@mui/material";

function ElementsPanel() {
  const state = useContext(AppContext);

  return (
    <div className="elementsContainer">
      <div className="labDevices">Devices</div>
      <div className="row">
        <div className="card">
          <CardMedia
            component="img"
            height="60"
            image={process.env.PUBLIC_URL + "/images/controller.png"}
            onClick={() => {
              state.saveController("paco", 8080, "Ryu", "192.168.120.2");
            }}
          />
          <div className="label">Controller</div>
        </div>
        <div className="card">
          <CardMedia
            component="img"
            height="60"
            image={process.env.PUBLIC_URL + "/images/switch.png"}
            onClick={() => {
              state.saveSwitch("s1", "udp", 8090, "AB:00:CF:03");
            }}
          />
          <div className="label">Switch</div>
        </div>
        <div className="card">
          <CardMedia
            component="img"
            height="60"
            image={process.env.PUBLIC_URL + "/images/host.png"}
          />
          <div className="label">Host</div>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <CardMedia
            component="img"
            height="60"
            image={process.env.PUBLIC_URL + "/images/ethernet.png"}
          />
          <div className="label">Ethernet</div>
        </div>
        <div className="card">
          <CardMedia
            component="img"
            height="60"
            image={process.env.PUBLIC_URL + "/images/fiber.png"}
          />
          <div className="label">Fiber</div>
        </div>
      </div>
    </div>
  );
}

export default ElementsPanel;
