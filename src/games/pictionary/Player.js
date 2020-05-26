import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';
import Avatar from '@material-ui/core/Avatar';
import './Pic.css';

export default class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = { start: 0, players: this.props.people, points: [], onScreen: []}
        };

    renderPlayers(array){
        for (let i = 0; i < array.length; i++){
            this.state.onScreen.push(<div><p><li><img style={{height: "20px"}} src={this.props.pics[i]}></img></li>{this.state.players[i]}</p><p>Points: {this.state.points[i]}</p></div>);
        }
    }

    render() {

        while (this.state.players.length > this.state.points.length){
            this.state.points.push(0);
        }

        return(
            <div>
                <h1>Players: </h1>
                <p>
                    {this.renderPlayers(this.state.players)}
                    {this.state.onScreen}
                </p> 
            </div>
        );
    }

}