import React from "react";
import "./elementsPanel.css";
import { CardMedia } from "@mui/material";

function ElementsPanel() {
  return (
    <div className="elementsContainer">
      <div className="labDevices">Devices</div>
      <div className="row">
        <div className="card">
          <CardMedia
            component="img"
            height="60"
            image={process.env.PUBLIC_URL + "/images/controller.png"}
          />
          <div className="label">Controller</div>
        </div>
        <div className="card">
          <CardMedia
            component="img"
            height="60"
            image={process.env.PUBLIC_URL + "/images/switch.png"}
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
