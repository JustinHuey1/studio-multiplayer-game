import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';
import './Pic.css';

export default class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = { player1: 0}
        };
        
    render() {
        // var id = this.getSessionId();
        // var users = this.getSessionUserIds().map((user_id) => (
        //     <li key={user_id}>{UserApi.getPhotoUrl(user_id)}    {UserApi.getName(user_id)}</li>
        // ));

        return(
            <div>
                <h1>Players: </h1>
                <ul>
                    {this.props.people}
                    <p>Points: {this.state.player1}</p>
                </ul> 
            </div>
        );
    }

}