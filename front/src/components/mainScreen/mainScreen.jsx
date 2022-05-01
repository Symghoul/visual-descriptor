import React, { useEffect, useContext } from "react";
import "./mainScreen.css";

import ToolsPanel from "../tools/toolsPanel";

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceType: 0,
    };
    this.changePanel = this.changePanel.bind(this);
  }

  showView() {
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
      msg: "Clicked",
    });
  }

  render() {
    return (
      <div className="mainScreen">
        <ToolsPanel />
      </div>
    );
  }
}

export default MainScreen;
