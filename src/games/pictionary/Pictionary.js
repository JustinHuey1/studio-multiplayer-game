import GameComponent from '../../GameComponent.js';
import React from 'react';
import firebase from 'firebase';
import UserApi from '../../UserApi.js';
import Board from './Board.js';
import Timer from './Timer.js';
import Player from './Player.js';
import Word from './Word.js';
import Chat from './Chat.js';
import CanvasDraw from "react-canvas-draw"; 

import './Pic.css';

export default class Pictionary extends GameComponent {
  constructor(props) {
    super(props);

    this.state = { 
      currentCount: 60, 
      fakeCount: 10,
      play: true, 
      number: 0, 
      words: ["codenation", "spongebob", "shark", "pencil", "bicycle", "book", "igloo", "pizza", "dragon", ], 
      string: [],
      once: true,
      blankLetters: 2,
      saveNumbers: [],
      currentUser: this.getMyUserId(),
      gameUsers: [],
      gameUsersPics: [],
      userDrawer: 0,
      saveData: null,
      color: "#000000", 
        brushRadius: 5, 
        sum: 0, 
      }
      this.saveableCanvas = React.createRef();
      this.loadableCanvas = React.createRef();
    };

    timer() {
      if (this.state.play){
        this.setState({
          currentCount: this.state.currentCount - 1,
        });
      } else if (!this.state.play){
        this.setState({
          fakeCount: this.state.fakeCount - 1,
        })
      }

      if(this.state.currentCount < 1) { 
          this.setState({ 
            play: false,
          });    
      }

      if(!this.state.play){
        this.Show();
        if (this.state.fakeCount < 1){
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
        play: true,
        fakeCount: 10,
        currentCount: 60, 
        saveNumbers: [],
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

      if (this.state.userDrawer + 1 > this.state.gameUsers.length){
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

    checkArray(array, number){
      for (let i = 0; i < array.length; i++){
        if (number === array[i]){
          return true;
        }
      }
      return false;
    }

    clearBoard(){
      this.saveableCanvas.clear();
    };
    
    undoBoard(){
        this.saveableCanvas.undo();
    }

    changeColor(type){
        this.setState({ color: type});
    }

    save(){
        this.setState({ saveData: this.saveableCanvas.getSaveData()});
        this.changeInfo();
    }

    load(){
        this.loadableCanvas.loadSaveData(this.state.saveData, true)
    }

    changeInfo = () => {
      let information = {
      saveData: this.state.saveData,
      currentCount : this.state.currentCount, 
      fakeCount: this.state.fakeCount,
      play: this.state.play, 
      number: this.state.number, 
      words: this.state.words, 
      string: this.state.string,
      once: this.state.once,
      saveNumbers: this.state.saveNumbers,
      currentUser: this.state.currentUser,
      gameUsers: this.state.gameUsers,
      userDrawer: this.state.userDrawer,
      }
      console.log("Change info function");
      console.log(information.saveData);
      this.getSessionDatabaseRef().set(information, error => {
        if (error) {
          console.error("Error updating Kevin state", error);
        }
      });
    }

    onSessionDataChanged(data) {
      this.setState({
        currentCount: data.currentCount, 
        fakeCount: data.fakeCount,
        Play: data.Play, 
        number: data.number, 
        string: data.string,
        once: data.once,
        blankLetters: data.blankLetters,
        saveNumbers: data.saveNumbers,
        currentUser: data.currentUser,
        gameUsers: data.gameUsers,
        gameUsersPics: data.gameUsersPics,
        userDrawer: data.userDrawer,
        saveData: data.saveData,
      })
      console.log("On session data change");
      console.log(this.state);
      if (!this.state.meDrawer){
        this.load();
      }
    }

    render() {
      this.changeInfo();
      var id = this.getSessionId();
      var users = this.getSessionUserIds().map((user_id) => (
        UserApi.getName(user_id)
      ));

      // for (let i = 0; i < this.getSessionUserIds().length; i++){
      //   if ()
      //   this.state.gameUsers.push(this.getSessionUserIds()[i])
      // }

      var users1 = this.getSessionUserIds().map((user_id) => (
        this.state.gameUsers.push(user_id)
      ));
      
      var userPics = this.getSessionUserIds().map((user_id) => (
        UserApi.getPhotoUrl(user_id)
      ));
      
      var creator = UserApi.getName(this.getSessionCreatorUserId());
      var title = this.getSessionTitle();
        
      let prompt = this.state.words[this.state.number];
      if (this.state.currentUser === this.state.gameUsers[this.state.userDrawer]){
        let sub = [];
        for(let i = 0; i < prompt.length; i++){
          sub.push(prompt[i].toUpperCase());
          sub.push(" ");
        } 
        this.state.string = sub;
      } else {
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

        if (this.state.gameUsers.length > 0 && this.state.once){
          this.Start();
          this.setState({ once: false})
        }

        return (
          <div style= {{marginLeft: "2%"}}>
            <h1>{title}</h1>
            <p>Session ID: {id}</p>
            <p>Session creator: {creator}</p>
            <div className= "Players">
              <Player people= {users} pics= {userPics}/>
            </div>
            <div className= "Timer">
              <Timer time= {this.state.currentCount} break= {!this.state.play} fake= {this.state.fakeCount}/>
            </div>
            <div className= "Board">
            <button onClick= {() => this.save()}>save</button>
                <button onClick= {() => this.load()}>show</button>

                <div className= "middle">
                <button className= "clear" onClick= {() => {this.clearBoard();}}>Clear</button>
                    {this.state.meDrawer &&
                    <CanvasDraw
                        style={{
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                        brushColor={this.state.color}
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushRadius={this.state.brushRadius}
                        canvasWidth= "700px"
                        lazyRadius= {this.state.sum}
                        onChange=  {() => this.save()}
                        hideGrid= "true"
                    />
                      }
                    {!this.state.meDrawer &&
                    <CanvasDraw
                        style={{
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                        brushColor={this.state.color}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        brushRadius={this.state.brushRadius}
                        canvasWidth= "700px"
                        lazyRadius= {this.state.sum}
                        // onChange= {this.load()}
                        disabled= "true"
                        hideGrid= "true"
                        saveData= {this.state.saveData}
                    />  
                    }
                </div>
              {this.state.play && <Board playTime= {this.state.play} drawer= {this.state.meDrawer} change= {this.changeInfo} saveData= {this.state.saveData} save= {this.save}/>}
            </div>
            <div className= "Word">
              <Word time= {this.state.currentCount} word= {this.state.string} drawer= {this.state.meDrawer} playTime= {this.state.play}/>
            </div>
            <div className= "Chat">
              <Chat playTime= {this.state.play} answer= {prompt} people= {users} currentUser= {this.state.currentUser} drawer= {this.state.meDrawer}/>
            </div>
          </div>
        );
      }
    }