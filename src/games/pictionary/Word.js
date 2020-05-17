import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';
import './Pic.css';

export default class Word extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { }
        };

    render() {

        return(
            <div>
                <h1>{this.props.word}</h1>
            </div>
        );
    }

}