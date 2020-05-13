import React from 'react';
import firebase from 'firebase';
import Timer from './Timer.js';
import Chat from '.Chat.js';
import CanvasDraw from "react-canvas-draw"; 

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = { }
        };
        
    render() {

        return(
            <div>
                <Timer />
                <CanvasDraw
                    style={{
                        boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                    }}
                />
            </div>
        );
    }

}