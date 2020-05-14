// import React from 'react';
// import firebase from 'firebase';

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
          };
        };
        
          handleKeyEvent(key) {
            if (key === "Enter" && this.state.input.length > 0 && this.props.playTime === true) {
              var chatData = {
                message: this.state.input,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: this.getMyUserId(),
              }
              if (chatData.message.toLowerCase() === this.props.answer){
                console.log("Winner")
              }

              this.getSessionDatabaseRef().push(chatData, (error) => {
                if (error) {
                  console.error("Error storing session metadata", error);
                }
              });
              this.setState({ input: "" });
            }
          }
        
          render() {
            var chatListItems = this.state.chats.slice(0, 10).map((chat, i) => (
              <ListItem
                  key={chat.id}
                  disabled={true}
                  primaryText={UserApi.getName(chat.user)}
                  secondaryText={chat.message}
                  leftAvatar={<Avatar src={UserApi.getPhotoUrl(chat.user)} />} />
            ));
            return (
              <div>
                <TextField
                  onChange={(event) => this.setState({ input: event.target.value })}
                  onKeyPress={(event) => this.handleKeyEvent(event.key)}
                  value={this.state.input} />
                <List>
                  {chatListItems}
                </List>
              </div>
            );
          }
}