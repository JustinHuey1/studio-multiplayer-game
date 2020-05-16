import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';
import './Pic.css';

export default class Word extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { index: 0, index1: 0, once: true }
        };

    render() {
        // while (this.state.index < this.props.prompt.length - 1){
            let divide= Math.ceil(this.props.time / this.props.word.length);
            console.log(this.props.time % divide)
            if (this.props.time % divide === 0){
                let random = Math.floor(Math.random() * this.props.word.length);
    
                while (this.props.word[random] !== "_"){
                  if (random % 2 !== 0){
                      random -= 1; 
                  }
                  random = Math.floor(Math.random() * this.props.word.length);
                }
    
    
                this.props.word[random] = this.props.prompt[random];
                console.log(this.props.word);
                if (this.state.currentCount % 10 === 8 && this.state.once){
                    this.props.word[this.state.index] = this.props.prompt[this.state.index1];
                    this.setState({ index: this.state.index + 2, once: false, index1: this.state.index + 1})
                }
            }
        // }

        return(
            <div>
                <h1>{this.props.word}</h1>
            </div>
        );
    }

}