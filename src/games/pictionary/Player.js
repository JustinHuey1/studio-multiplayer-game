import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';

export default class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = { }
        };
        
    render() {
        var id = this.getSessionId();
        var users = this.getSessionUserIds().map((user_id) => (
            <li key={user_id}>{UserApi.getPhotoUrl(user_id)}    {UserApi.getName(user_id)}</li>
        ));

        return(
            <div>
                <ul>
                    {users}
                </ul> 
            </div>
        );
    }

}