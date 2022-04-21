import React, { useEffect, useContext } from "react";
import "./mainScreen.css"
import Preferences from "../preferences/preferences";
import Router from "../configPanel/router";
import Pc from "../configPanel/pc"
import ElementsPanel from "../elementsPanel/elementsPanel";

const MainScreen = () => {

    return (
        <div className="mainScreen">
            <Preferences />
            <ElementsPanel />
            <div className="configPanel">
             Configuration
            <Router />
            <Pc />
            </div>
        </div>
    );
}

export default MainScreen;