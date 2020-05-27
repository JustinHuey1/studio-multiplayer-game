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

  render() {

    return (
      <div>
        <div className= "talk">
          {this.props.display}
        </div>

        <div className= "chatInput">
          <TextField 
              fullWidth={true}
              onChange={(event) => this.props.changeText(event)}
              onKeyPress={(event) => this.props.handle(event.key)}
              value={this.props.value} 
              style={{marginLeft: "3%", marginBottom: 8, width: "65%", border: "2px solid black"}}
            />
            <button onClick= {() =>  this.props.append()} style={{marginLeft: "3%", height: 30, width: "25%", borderRadius: 80}}>Enter</button>
        </div>
      </div>
    );
  }
}