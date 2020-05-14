import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';
import './Pic.css';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { }
        };

    render() {

        return(
            <div>
                <div className= "Timer">
                    <h1>Time Left: {this.props.time}</h1>
                </div>
            </div>
        );
    }

}