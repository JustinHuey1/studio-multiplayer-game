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
        
    renderPoints(array){
        let points = array.map((e) => <p>Points: {e}</p>);
        return points
    }

    render() {
        if (this.state.once){
            for (let i = 0; i < this.props.people.length; i++){
                this.state.points.push(0);
            }
            this.setState({ once: false})
        }

        return(
            <div>
                <h1>Players: </h1>
                <p>
                    {this.props.people}
                    {this.renderPoints(this.state.points)}
                </p> 
            </div>
        );
    }

}