import GameComponent from '../../GameComponent.js';
import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';
import Board from './Board.js';
import Player from './Player.js';
import Word from './Word.js';
import './Pic.css';

export default class Pictionary extends GameComponent {
  constructor(props) {
    super(props);

    this.state = { }
    };

    render() {
        var id = this.getSessionId();
        var users = this.getSessionUserIds().map((user_id) => (
          <li key={user_id}>{UserApi.getName(user_id)}</li>
        ));
        var creator = UserApi.getName(this.getSessionCreatorUserId());

        return (
          <div>
            <p>Session ID: {id}</p>
            <p>Session creator: {creator}</p>
            
            <div className= "Word">
              <Word />
            </div>
            <div className= "Players">
              <Player people= {users}/>
            </div>
            <div className= "Board">
              <Board />
            </div>
          </div>
        );
      }
    }