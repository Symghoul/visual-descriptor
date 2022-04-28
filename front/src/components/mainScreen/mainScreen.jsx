import React, { useEffect, useContext } from "react";
import "./mainScreen.css"
import Preferences from "../preferences/preferences";
import Router from "../configPanel/router";
import Pc from "../configPanel/pc"
import ElementsPanel from "../elementsPanel/elementsPanel";
import StatelessComponent from "../testStateless"


class MainScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            deviceType: 0,
            msg:"Beta"
        };
        this.changePanel = this.changePanel.bind(this)
    }

    showView(){
        
        if(this.state.deviceType === 0){
            return (<></>);                
        }else if(this.state.deviceType === 1){
            return <Router />;
        }else if(this.state.deviceType === 2){
            return (<Pc />);
        }
    }

    changePanel(){
        this.setState(
            {
                deviceType: this.state.deviceType+1 ,
                msg:"Clicked"
            }
        );
    }

    render() {
        return (
            <div className="mainScreen">
                <Preferences />
                <ElementsPanel />
                <div className="configPanel">
                 Configuration

                {this.showView()}

                <button onClick={this.changePanel}>Change</button>

                <StatelessComponent name={this.state.msg}/>


                </div>
            </div>
        );
    }

}


export default MainScreen;