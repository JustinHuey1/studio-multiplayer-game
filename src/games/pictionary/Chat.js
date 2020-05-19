import Avatar from '@material-ui/core/Avatar';
import GameComponent from '../../GameComponent.js';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import UserApi from '../../UserApi.js';
import firebase from 'firebase';
import { List, ListItem } from 'material-ui/List';
import './Pic.css';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      input: "",
      instance: [],
      show: " ",
    };
  }

  handleKeyEvent(key) {
    if (key === "Enter" && this.state.input.length > 0 && this.props.playTime) {
      var chatData = {
        message: this.state.input,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: this.getMyUserId(),
      }
      
      this.state.instance.push(this.state.input)
      this.setState({ show: this.props.people + ": " + this.state.instance})

      if (chatData.message.toLowerCase() === this.props.answer){
        console.log("WINNER");
      }

      this.getSessionDatabaseRef().push(chatData, (error) => {
        if (error) {
          console.error("Error storing session metadata", error);
        }
      });

      this.setState({ input: "" });
    }
  }

  send(){
    this.state.instance.push(this.state.input)
    if (this.state.instance[this.state.instance.length - 1].toLowerCase() === this.props.answer){
      console.log("WINNER");
    }
    this.setState({ show: this.props.people[0].props.children + ": " + this.state.instance, input: " "})
  }

  allMessages(array){
    for (let i = 0; i < array.length; i++){

    }
  }

  render() {
    var chatListItems = this.state.chats.slice(0, 10).map((chat, i) => (
      <ListItem
          key={chat.id}
          style={{opacity: (10 - i) / 10}}
          disabled={true}
          primaryText={UserApi.getName(chat.user)}
          secondaryText={chat.message} />
    ));
    return (
      <div>
        <div className= "talk">
          {this.state.show}
        </div>

        <div className= "chatInput">
          <TextField 
              fullWidth={true}
              onChange={(event) => this.setState({ input: event.target.value })}
              onKeyPress={(event) => this.handleKeyEvent(event.key)}
              value={this.state.input} 
              style={{marginLeft: "3%", marginBottom: 8, width: "65%", border: "2px solid black"}}
            />
            <button onClick= {() => this.send()} style={{marginLeft: "3%", height: 30, width: "25%", borderRadius: 80}}>Enter</button>
        </div>
      </div>
    );
  }
}
