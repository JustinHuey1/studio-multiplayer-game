import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';
import Avatar from '@material-ui/core/Avatar';
import './Pic.css';

export default class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            players: this.props.people, 
            points: this.props.points, 
            onScreen: this.props.screen
        };

    }

    render() {

        return(
            <div>
                <h1>Players: </h1>
                <p>
                    {this.state.photos}
                    {this.state.onScreen}
                </p> 
            </div>
        );
    }

}