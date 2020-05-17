import GameComponent from '../../GameComponent.js';
import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';
import Board from './Board.js';
import Timer from './Timer.js';
import Player from './Player.js';
import Word from './Word.js';
import './Pic.css';

export default class Pictionary extends GameComponent {
  constructor(props) {
    super(props);

    this.state = { 
      currentCount: 60, 
      // Play: true, 
      number: 0, 
      words: ["codenation", "spongebob", "shark", "pencil", "bicycle", "book", "igloo", "pizza", "dragon", ], 
      string: [],
      begin: false,
      end: true,
      index: 0, 
      index1: 0, 
      once: true,
      }
    };

    timer() {
      if (this.state.begin){
        this.setState({
            currentCount: this.state.currentCount - 1,
        })
      }
      if(this.state.currentCount < 1) { 
          this.setState( { end: false, begin: false });
      }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 50);
    }

    Start(){
      let prompt = this.state.words[this.state.number];
      let sub = [] 
      for(let i = 0; i < prompt.length; i++){
          sub.push("_");
          sub.push(" ");
      }
      this.setState({ 
        string: sub, 
        begin: true,
      });
    }

    Next(){
      let prompt = this.state.words[this.state.number];
      let sub = [] 
      for(let i = 0; i < prompt.length; i++){
          sub.push(prompt[i].toUpperCase());
          sub.push(" ");
      }
      this.setState({  
        currentCount: 60, 
        begin: false, 
        end: true, 
        index: 0, 
        index1: 0,
        string: sub,
      });
      if (this.state.number + 2 > this.state.words.length){
        this.setState({  
          number: 0,
        });
      } else {
        this.setState({  
          number: this.state.number + 1,
        });
      }
    }

    render() {
        var id = this.getSessionId();
        var users = this.getSessionUserIds().map((user_id) => (
          <li key={user_id}>{UserApi.getName(user_id)}</li>
        ));
        var creator = UserApi.getName(this.getSessionCreatorUserId());

        let prompt = this.state.words[this.state.number];
        
          let divide = Math.ceil(60 / (prompt.length - 1));
          
          if (this.state.currentCount % divide === ((this.state.currentCount % divide)/2)){
              let random = Math.floor(Math.random() * prompt.length);
              console.log(random);
              
              while (this.state.string[random] !== "_"){
                if (random % 2 !== 0){
                    random -= 1; 
                }
                random = Math.floor(Math.random() * prompt.length);
              }


            this.state.string[random * 2] = prompt[random];
            // if (this.state.currentCount % divide === ((this.state.currentCount % divide)/2) + 2 && !this.state.once){
            //     this.setState({ once: true});
            // }

            // if (this.state.currentCount % divide === ((this.state.currentCount % divide)/2) + 1 && this.state.once){
            //     this.state.string[this.state.index] = prompt[this.state.index1].toUpperCase();
            //     this.setState({ index: this.state.index + 2, once: false, index1: this.state.index1 + 1})
            // }
        }
          
        
        return (
          <div>
            <p>Session ID: {id}</p>
            <p>Session creator: {creator}</p>
            
            <div className= "Players">
              <Player people= {users}/>
            </div>
            <div className= "Timer">
              <Timer time= {this.state.currentCount}/>
            </div>
            <div className= "Board">
              <Board playable= {this.state.begin}/>
            </div>
            <div className= "Word">
              {!this.state.end && <button onClick= {() => this.Next()}>Next</button>}
              {!this.state.begin && this.state.end && <button onClick= {() => this.Start()}>Start</button>}
              <Word time= {this.state.currentCount} word= {this.state.string} prompt= {prompt}/>
            </div>
          </div>
        );
      }
    }