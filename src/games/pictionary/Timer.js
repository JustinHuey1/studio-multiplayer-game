import React from 'react';
import firebase from 'firebase';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { currentCount: 60, Play: True}
        };
        
    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        if(this.state.currentCount < 1) { 
            clearInterval(this.intervalId);
            this.setState( { Play: False });
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
                    <p>{this.state.currentCount}</p>
                </div>
                <div className= "Chat">
                    <Chat playTime={this.state.Play}/>
                </div>
            </div>
        );
    }

}