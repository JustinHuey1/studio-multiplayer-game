import GameComponent from '../../GameComponent.js';
import React from 'react';
import firebase from 'firebase';
import { HashRouter, Route, Switch } from "react-router-dom";
import UserApi from '../../UserApi.js';
import Board from './Board.js';
import Timer from './Timer.js';
import Player from './Player.js';
import Word from './Word.js';
import Chat from './Chat.js';
import './Pic.css';

export default class Pictionary extends GameComponent {
  constructor(props) {
    super(props);

    this.state = { 
      currentCount: 60, 
      fakeCount: 10,
      // Play: true, 
      number: 0, 
      words: ["codenation", "spongebob", "shark", "pencil", "bicycle", "book", "igloo", "pizza", "dragon", ], 
      string: [],
      begin: false,
      once: true,
      blankLetters: 2,
      saveNumbers: [],
      break: false,
      currentUser: this.getMyUserId(),
      gameUsers: [],
      userDrawer: 0,
      }
    
    };

    timer() {
      if (this.state.begin){
        this.setState({
          currentCount: this.state.currentCount - 1,
        });
      } else if (this.state.break){
        this.setState({
          fakeCount: this.state.fakeCount - 1,
        })
      }

      if(this.state.currentCount < 1) { 
          this.setState({ 
            begin: false, 
            break: true, 
          });    
      }

      if(this.state.break){
        this.Show();
        if (this.state.fakeCount < 1){
          this.setState({ 
            break: false,
            currentCount: 60, 
            begin: false, 
            saveNumbers: [],
          })
          this.Next();
          this.Start();
        }
      }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 500);
    }

    Start(){
      let prompt = this.state.words[this.state.number];
      let sub = [] ;

      if (this.state.currentUser === this.state.gameUsers[this.state.userDrawer]){   
        this.setState({ meDrawer: true})
      } else {
        this.setState({ meDrawer: false})
        for(let i = 0; i < prompt.length; i++){
            sub.push("_");
            sub.push(" ");
        }    
      }

      this.setState({ 
        string: sub, 
        begin: true,
        fakeCount: 10,
      });

      this.getSessionDatabaseRef().set(this.state.string, error => {
        if (error) {
          console.error("Error updating Kevin state", error);
        }
      });
    }

    Next(){
      if (this.state.number + 2 > this.state.words.length){
        this.setState({  
          number: 0,
        });
      } else {
        this.setState({  
          number: this.state.number + 1,
        });
      }

      if (this.userDrawer + 1 > this.state.gameUsers.length){
        this.setState({ userDrawer: 0});
      } else {
        this.setState({ userDrawer: this.state.userDrawer + 1 });
      }
    }

    Show(){
      let prompt = this.state.words[this.state.number];
      let sub = [] 
      for(let i = 0; i < prompt.length; i++){
          sub.push(prompt[i].toUpperCase());
          sub.push(" ");
      }

      this.setState({  
        string: sub,
      });

    }

    Information(){
      let prompt = this.state.words[this.state.number];
        
        // If you want more than 1 blank letter at the end, change this.state.blankLetters
        let divide = Math.ceil(60 / (prompt.length - this.state.blankLetters));

        if (this.state.currentCount % divide === ((this.state.currentCount % divide)/2) + 2 && !this.state.bool){
            this.setState ({ bool: true});
        }

        // A letter will be revealed randomly
        if (this.state.currentCount % divide === ((this.state.currentCount % divide)/2) + 1 && this.state.bool){
            let random = Math.floor(Math.random() * this.state.string.length);
            if (random % 2 !== 0){
              random -= 1;
            }

            while (this.checkArray(this.state.saveNumbers, random)){
              random = Math.floor(Math.random() * this.state.string.length);
              if (random % 2 !== 0){
                random -= 1;
              }
            }

            if(!this.checkArray(this.state.saveNumbers, random)){
              this.state.saveNumbers.push(random);
            } 

            this.state.string[random] = prompt[random / 2].toUpperCase();
            this.setState ({ bool: false})
        }
    }

    checkArray(array, number){
      for (let i = 0; i < array.length; i++){
        if (number === array[i]){
          return true;
        }
      }
      return false;
    }

    changeInfo(){
      let information = {
        
      }

      this.getSessionDatabaseRef().set(information, error => {
        if (error) {
          console.error("Error updating Kevin state", error);
        }
      });
    }

    onSessionDataChanged(data) {
      this.setState({
      // Play: true, 
        number: data.number, 
        string: data.string,
        begin: data.begin,
        once: data.once,
        blankLetters: 2,
        saveNumbers: data.saveNumbers,
        break: data.break,
        currentUser: data.currentUser,
        gameUsers: data.gameUsers,
        userDrawer: data.userDrawer,
      });
      console.log("yes")
    }

    render() {
        var id = this.getSessionId();
        var users = this.getSessionUserIds().map((user_id) => (
          <li key={user_id}>{UserApi.getName(user_id)}</li>
        ));

        var users1 = this.getSessionUserIds().map((user_id) => (
          this.state.gameUsers.push(user_id)
        ));
        
        var creator = UserApi.getName(this.getSessionCreatorUserId());
          
        if (this.state.currentUser === this.state.gameUsers[this.state.userDrawer]){
          this.state.string = "Draw Word: " + this.state.words[this.state.number].toUpperCase();
        } else {
          this.Information();
        }

        if (this.state.gameUsers.length > 0 && this.state.once){
          this.Start();
          this.setState({ once: false})
        }

        return (
          <div>
            <HashRouter basename={process.env.PUBLIC_URL}>
              <p>Session ID: {id}</p>
              <p>Session creator: {creator}</p>
              
              <div className= "Players">
                <Player people= {users}/>
              </div>
              <div className= "Timer">
                <Timer time= {this.state.currentCount} break= {this.state.break} fake= {this.state.fakeCount}/>
              </div>
              <div className= "Board">
                {/* <Board playable= {this.state.begin}/> */}
                {!this.state.break && <Board playable= {this.state.begin} drawer= {this.state.meDrawer}/>}
              </div>
              <div className= "Word">
                <Word time= {this.state.currentCount} word= {this.state.string} prompt= {prompt}/>
              </div>
              <div className= "Chat">
                <Chat playTime= {this.state.begin} answer= {prompt} people= {users}/>
              </div>
            </HashRouter>
          </div>
        );
      }
    }