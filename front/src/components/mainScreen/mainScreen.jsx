import React from "react";
import "./mainScreen.css";
import ToolsPanel from "../tools/toolsPanel";
import Canva from "../canva/canva";

// Main Frame of the application
function MainScreen() {
  return (
    <div id="mainscreen">
      <div>
        <ToolsPanel />
      </div>
      <div>
        <Canva />
      </div>
    </div>
  );
}

export default MainScreen;
