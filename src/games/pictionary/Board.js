import React from 'react';
import firebase from 'firebase';
import Timer from './Timer.js';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = { }
        };
        
    focusCanvas(){
        this.myRef.current.focus();
    }
    render() {

        return(
            <div>
                <Timer />
                <canvas className= "canvas" ref={this.myRef}></canvas>
            </div>
        );
    }

}