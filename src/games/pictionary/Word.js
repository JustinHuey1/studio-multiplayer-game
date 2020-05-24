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
                {this.props.drawer && this.props.playTime && <h1>Draw: <span style={{color: "aqua"}}>{this.props.word}</span></h1>}
                {!this.props.drawer && this.props.playTime && <h1>{this.props.word}</h1>}
                {!this.props.playTime && <h1>Word was <span style={{color: "red"}}>{this.props.word}</span></h1>}
            </div>
        );
    }

}