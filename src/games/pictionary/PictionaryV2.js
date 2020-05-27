import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import gameData from "../../gameData.js";
import CanvasDraw from "react-canvas-draw";
import ReactDOM from "react-dom";
import "./Pic.css";

export default class PictionaryV2 extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null
    };
    this.drawerCanvas = React.createRef();
    this.viewerCanvas = React.createRef();
  }

  onSessionDataChanged(data) {
    this.setState(data);
    //this.drawerCanvas.forceUpdate();
  }

  sendFirebaseData() {
    this.getSessionDatabaseRef().set(this.state, error => {
      if (error) {
        console.error("Error updating Kevin state", error);
      }
    });
    console.log("sent");
  }

  clear() {
    this.drawerCanvas.clear();
    let saveData = this.drawerCanvas.getSaveData();
    this.setState({ canvas: saveData });
    this.sendFirebaseData();
  }

  saveCanvas() {
    let saveData = this.drawerCanvas.getSaveData();
    this.setState({ canvas: saveData });
    this.sendFirebaseData();
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <h1>Creator User: {this.getSessionCreatorUserId()}</h1>
        <h1>Current User: {this.getMyUserId()}</h1>
        <h1>
          All Users:{" "}
          {this.getSessionUserIds().map(user => (
            <ul>{user}</ul>
          ))}
        </h1>
        {/* <h1>Canvas: {this.state.canvas} </h1> */}
        {this.getMyUserId() === this.getSessionCreatorUserId() ? (
          <button onClick={() => this.clear()}>Clear</button>
        ) : null}
        <div>
          {this.getMyUserId() === this.getSessionCreatorUserId() && (
            <CanvasDraw
              hideGrid="true"
              style={{
                boxShadow:
                  "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
              }}
              loadTimeOffset={0}
              ref={myCanvas => (this.drawerCanvas = myCanvas)}
              onChange={() => this.saveCanvas()}
              brushColor="red"
              lazyRadius={0}
              gridColor="rgba(150,150,150,0.17)"
            />
          )}
        </div>
        <div>
          {this.getMyUserId() !== this.getSessionCreatorUserId() && (
            <CanvasDraw
              hideGrid="true"
              disabled="true"
              style={{
                boxShadow:
                  "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
              }}
              loadTimeOffset={0}
              ref={myCanvas => (this.viewerCanvas = myCanvas)}
              onChange={() => console.log("onChange")}
              brushColor="blue"
              lazyRadius={0}
              saveData={this.state.canvas}
            />
          )}
        </div>
      </div>
    );
  }
}
