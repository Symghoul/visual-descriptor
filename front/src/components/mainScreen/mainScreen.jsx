import React from "react";
import "./mainScreen.css";

import Canva from "../canva/canva";

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
