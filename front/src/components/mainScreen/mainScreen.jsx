import React from "react";
import "./mainScreen.css";

import Canva from "../canva/canva";

// Main Frame of the application
// It just have the canva
function MainScreen() {
  return (
    <div className="row">
      <div className="panel">
        <Canva />
      </div>
    </div>
  );
}

export default MainScreen;
