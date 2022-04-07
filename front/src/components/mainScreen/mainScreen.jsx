import React, { useEffect, useContext } from "react";
import Preferences from "../preferences/preferences";
import ConfigPanel from "../configPanel/configPanel";
import ElementsPanel from "../elementsPanel/elementsPanel";

const MainScreen = () => {

    return (
        <div className="mainScreen">
            <Preferences />
            <ElementsPanel />
            <ConfigPanel />
        </div>
    );
}

export default MainScreen;