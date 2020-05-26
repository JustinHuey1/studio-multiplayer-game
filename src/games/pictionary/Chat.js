import GameComponent from '../../GameComponent.js';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import UserApi from '../../UserApi.js';
import firebase from 'firebase';
import './Pic.css';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: this.displayData,
      postVal: "",
    };
    this.displayData = [];
  }

  handleKeyEvent = (key) => {
    if (key === "Enter" && this.state.postVal !== " " && this.props.playTime && !this.props.drawer) {
      this.appendData();
    }
  }

  appendData = () => {
    if (this.state.postVal.toLowerCase() === this.props.answer){
      this.displayData.push(<div style= {{color: "green"}}>{UserApi.getName(this.props.currentUser)} got the answer right!</div>)
    } else  {
      this.displayData.push(<div>{UserApi.getName(this.props.currentUser)}: {this.state.postVal}</div>)
    }

    var dataBaseState = {
      postVal: this.state.postVal
    }
    // this.getSessionDatabaseRef().set(dataBaseState, error => {
    //   if (error) {
    //     console.error("Error updating Kevin state", error);
    //   }
    // });

      this.setState({
      showData: this.displayData,
      postVal: "",
    })
    
  }

  render() {

    return (
      <div>
        <div className= "talk">
          {this.displayData}
        </div>

        <div className= "chatInput">
          <TextField 
              fullWidth={true}
              onChange={(event) => this.setState({ postVal: event.target.value })}
              onKeyPress={(event) => this.handleKeyEvent(event.key)}
              value={this.state.postVal} 
              style={{marginLeft: "3%", marginBottom: 8, width: "65%", border: "2px solid black"}}
            />
            <button onClick= {() =>  (!this.props.drawer) && this.appendData()} style={{marginLeft: "3%", height: 30, width: "25%", borderRadius: 80}}>Enter</button>
        </div>
      </div>
    );
  }
}
