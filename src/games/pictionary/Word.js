import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';

export default class Word extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { number: 0}
        };

    addOne(){
        this.setState({ number: this.state.number + 1});

    }

    render() {
        let words = ["shark", "pencil", "bicycle", "book"];
        console.log(words[this.state.number]);
        return(
            <div>
                <div className= "Chat">
                    <Chat answer={words[this.state.number]}/>
                </div>
            </div>
        );
    }

}