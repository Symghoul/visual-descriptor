import React from "react";

class Clock extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {msg:"Beta"}
        this.changeMessage = this.changeMessage.bind(this)
    }

    changeMessage(){
        this.setState({
            msg: "Omega"
        });
    } 
    
    render() {
      return (

        <div>
          <h1>Hello, world!</h1>
          <small>{this.state.msg}</small>

            <button onClick={this.changeMessage}>Change</button>

        </div>
          
      );
    }
  }

  export default Clock;