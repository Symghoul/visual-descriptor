import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import "./toolsPanel.css";

import Preferences from "./preferences/preferences";

import ControllerConfig from "./configPanel/controllerConfig";
import HostConfig from "./configPanel/hostConfig";
import SwitchConfig from "./configPanel/switchConfig";
import LinkConfig from "./configPanel/linkConfig";

/**
 * Component in charge of display the form of the selected device
 * @returns The form required
 */
function ToolsPanel() {
  const state = useContext(AppContext);
  const [configDevice, setConfigDevice] = useState(null);

  /**
   * Checks which device is selected
   */
  useEffect(() => {
    console.log(state.selectedDevice);
    setConfigDevice(state.selectedDevice);
  }, [state.selectedDevice]);

  /**
   * Method that loads the correct form
   * @returns The correct form
   */
  const showView = () => {
    if (configDevice === null) {
      return <></>;
    } else if (configDevice.type === "controller") {
      return <ControllerConfig />;
    } else if (configDevice.type === "host") {
      return <HostConfig />;
    } else if (configDevice.type === "switch") {
      return <SwitchConfig />;
    } else if (configDevice.type === "link") {
      return <LinkConfig />;
    }
  };

  return (
    <div className="toolsPanel_container">
      <div>
        <Preferences />
      </div>
      <div>{showView()}</div>
    </div>
  );
}

export default ToolsPanel;
