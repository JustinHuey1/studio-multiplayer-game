import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';
import './Pic.css';

export default class Word extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { number: 0}
        this.addOne = this.addOne.bind(this);
        };

    addOne(){
        this.setState({ number: this.state.number + 1});
        console.log("HI")
    }

    render() {
        let words = ["shark", "pencil", "bicycle", "book"];
        console.log(words[this.state.number]);
        
        let string = []
        let prompt = words[this.state.number];
        for(let i = 0; i < prompt.length; i++){
            string.push("_");
            string.push(" ");
        }

       if (this.props.time % 10 === 9){
            let random = Math.floor(Math.random() * string.length);
            console.log(random)

            if (random % 2 !== 0){
                random -= 1;
            }

            while (string[random] !== "_"){
                random = Math.floor(Math.random() * string.length);
                if (random % 2 !== 0){
                    random -= 1;
                }
            }

            console.log(random)
            string[random] = prompt[random]
       }

        return(
            <div>
                <button onClick= {this.addOne}>Next</button>
                <h1>{string}</h1>
            </div>
        );
    }

}