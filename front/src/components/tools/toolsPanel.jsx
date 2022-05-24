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
  const [configDevice, setConfigDevice] = useState(null);

  useEffect(() => {
    setConfigDevice(state.selectedDevice);
  }, [state.selectedDevice]);

  const showView = () => {
    if (configDevice === null) {
      return <></>;
    } else if (configDevice.type === "controller") {
      return <ControllerConfig name={configDevice.name} />;
    } else if (configDevice.type === "host") {
      return <HostConfig />;
    } else if (configDevice.type === "switch") {
      return <SwitchConfig />;
    } else if (configDevice.type === "link") {
      return <LinkConfig />;
    }
  };

  return (
    <div className="toolsPanel">
      <Preferences />
      <div className="configPanesl">{showView()}</div>
    </div>
  );
}

export default ToolsPanel;
