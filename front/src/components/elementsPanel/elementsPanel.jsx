import React from "react";
import './elementsPanel.css'
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
              image={process.env.PUBLIC_URL + '/images/test.jpg'}
            />
              <div className="label">Controller</div>
            </div>
            <div className="card">
              <CardMedia
                component="img"
                height="60"
                image="../static/images/elements/switch.png"
              />
              <div className="label">Switch</div>
            </div>
            <div className="card">
              <CardMedia
                component="img"
                height="60"
                image="../static/images/elements/host.png"
              />
              <div className="label">Host</div>
            </div>
          </div>
          <div className="row">
            <div className="card">
              <CardMedia
                component="img"
                height="60"
                image="../static/images/elements/ethernet.png"
              />
              <div className="label">Ethernet</div>
            </div>
            <div className="card">
              <CardMedia
                component="img"
                height="60"
                image="../static/images/elements/fiber.png"
              />
              <div className="label">Fiber</div>
            </div>
          </div>
        </div>
    );
}

export default ElementsPanel;
