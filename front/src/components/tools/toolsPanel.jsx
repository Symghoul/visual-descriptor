import React, { useEffect, useContext } from "react";
import "./toolsPanel.css";

import Preferences from "./preferences/preferences";

import ElementsPanel from "./elementsPanel/elementsPanel";

import Router from "./configPanel/router";
import Host from "./configPanel/host";
import Switch from "./configPanel/switch";
import Link from "./configPanel/link";

class ToolsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceType: 0,
    };
    this.changePanel = this.changePanel.bind(this);
  }

  showView() {
    if (this.state.deviceType === 0) {
      return <></>;
    } else if (this.state.deviceType === 1) {
      return <Router />;
    } else if (this.state.deviceType === 2) {
      return <Host />;
    } else if (this.state.deviceType === 3) {
      return <Switch />;
    } else if (this.state.deviceType === 4) {
      return <Link />;
    }

    if (this.state.deviceType === 5) {
      this.setState({
        deviceType: 0,
      });
      return <></>;
    }
  }

  changePanel() {
    this.setState({
      deviceType: this.state.deviceType + 1,
    });
  }

  render() {
    return (
      <div className="toolsPanel">
        <Preferences />
        <ElementsPanel />
        <div className="configPanel">
          Configuration
          {this.showView()}
          <button onClick={this.changePanel}>Change</button>
        </div>
      </div>
    );
  }
}

export default ToolsPanel;
