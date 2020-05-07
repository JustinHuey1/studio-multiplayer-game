import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';

export default class Word extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { number: 0}
        };

    render() {
        let words = ["blah", "ble"];
        console.log(words);
        return(
            <div>
                <div className= "Chat">
                    <Chat answer={words[this.state.number]}/>
                </div>
            </div>
        );
    }

}