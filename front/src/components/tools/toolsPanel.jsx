import React, { useEffect, useContext, useState } from "react";
import "./toolsPanel.css";

import Preferences from "./preferences/preferences";

import ElementsPanel from "./elementsPanel/elementsPanel";

import ControllerConfig from "./configPanel/controllerConfig";
import HostConfig from "./configPanel/hostConfig";
import SwitchConfig from "./configPanel/switchConfig";
import LinkConfig from "./configPanel/linkConfig";

function setUp() {
  return 0;
}

function ToolsPanel() {
  const [deviceType, setDeviceType] = useState(() => setUp());

  const showView = () => {
    if (deviceType === 0) {
      return <></>;
    } else if (deviceType === 1) {
      return <ControllerConfig />;
    } else if (deviceType === 2) {
      return <HostConfig />;
    } else if (deviceType === 3) {
      return <SwitchConfig />;
    } else if (deviceType === 4) {
      return <LinkConfig />;
    }

    if (deviceType === 5) {
      setDeviceType((deviceType) => 0);
      return <></>;
    }
  };

  function changePanel() {
    setDeviceType((prevDeviceType) => prevDeviceType + 1);
  }

  return (
    <div className="toolsPanel">
      <Preferences />
      <ElementsPanel />
      <div className="configPanel">
        Configuration
        {showView()}
        <button onClick={changePanel}>Change</button>
      </div>
    </div>
  );
}

export default ToolsPanel;
