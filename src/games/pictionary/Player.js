import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';
import Avatar from '@material-ui/core/Avatar';
import './Pic.css';

export default class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = { once: true, start: 0, players: [], points: []}
        };
        
    render() {
        if (this.state.once){
            for (let i = 0; i < this.props.people.length; i++){
                let concat = "player" + i;
                this.setState({ concat: "Points: " + this.state.start});
                this.state.players.push(concat);
                this.state.points.push(0);
                console.log(this.state.players)
            }
            this.setState({ once: false})
        }

        return(
            <div>
                <h1>Players: </h1>
                <ul>
                    {this.props.people}
                    Points: {this.state.points}
                </ul> 
            </div>
        );
    }

}