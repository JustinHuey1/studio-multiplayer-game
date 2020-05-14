import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';
import './Pic.css';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { currentCount: 60, Play: true}
        };
        
    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        if(this.state.currentCount < 1) { 
            clearInterval(this.intervalId);
            this.setState( { Play: false });
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render() {

        return(
            <div>
                <div className= "Timer">
                    <h1>Time Left: {this.state.currentCount}</h1>
                </div>
                <div className= "Chat">
                    <Chat playTime={this.state.Play}/>
                </div>
            </div>
        );
    }

}