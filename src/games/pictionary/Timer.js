import React from 'react';
import firebase from 'firebase';
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
                    {!this.props.break && <h1>Time Left: {this.props.time}</h1>}
                    {this.props.break && <h1>Break Left: {this.props.fake}</h1>}
                </div>
            </div>
        );
    }

}