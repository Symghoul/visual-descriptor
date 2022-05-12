import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import "./toolsPanel.css";

import Preferences from "./preferences/preferences";

import ControllerConfig from "./configPanel/controllerConfig";
import HostConfig from "./configPanel/hostConfig";
import SwitchConfig from "./configPanel/switchConfig";
import LinkConfig from "./configPanel/linkConfig";

function ToolsPanel() {
  const state = useContext(AppContext);
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    setDeviceType(state.selectedDevice);
  }, [state.selectedDevice]);

  const showView = () => {
    if (deviceType === null) {
      return <></>;
    } else if (deviceType === "controller") {
      return <ControllerConfig />;
    } else if (deviceType === "host") {
      return <HostConfig />;
    } else if (deviceType === "switch") {
      return <SwitchConfig />;
    } else if (deviceType === 4) {
      return <LinkConfig />;
    }
  };

  return (
    <div className="toolsPanel">
      <Preferences />
      <div className="configPanel">
        Configuration
        {showView()}
      </div>
    </div>
  );
}

export default ToolsPanel;
