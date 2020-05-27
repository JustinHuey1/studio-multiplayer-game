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
import gameData from '../../gameData.js';

import './Pic.css';

export default class Pictionary extends GameComponent {
  constructor(props) {
    super(props);

    this.displayData = [];

    this.state = { 
      currentCount: 60, 
      fakeCount: 10,
      play: true, 
      index: 0, 
      words: ["codenation", "spongebob", "shark", "pencil", "bicycle", "book", "igloo", "pizza", "dragon", ], 
      stringArray: [],
      once: true,
      blankLetters: 2,
      // saveNumbers: [],
      // gameUsers: this.getSessionUserIds(),
      gameUsersPics: this.getSessionUserIds().map((user) => UserApi.getPhotoUrl(user)),
      userDrawer: 0,
      saveData: "",
      color: "#000000", 
      brushRadius: 5, 
      sum: 0, 
      showData: this.displayData,
      postVal: "",
      points: [], 
      onScreen: [],
      answered: [],
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
          postVal: "",
          saveData: "",
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
      
      let prompt = this.state.words[this.state.index];
      if (this.getMyUserId() === this.getSessionCreatorUserId()){
      // if (this.getMyUserId() === this.getSessionCreatorUserId()){
        let sub = [];
        for(let i = 0; i < prompt.length; i++){
          sub.push(prompt[i].toUpperCase());
          sub.push(" ");
        } 
        this.state.stringArray = sub;
      } else {
        // If you want more than 1 blank letter at the end, change this.state.blankLetters
        let divide = Math.ceil(60 / (prompt.length - this.state.blankLetters));

        if (this.state.currentCount % divide === ((this.state.currentCount % divide)/2) + 2 && !this.state.bool){
            this.setState ({ bool: true});
        }

        // A letter will be revealed randomly
        if (this.state.currentCount % divide === ((this.state.currentCount % divide)/2) + 1 && this.state.bool){
            let random = Math.floor(Math.random() * this.state.stringArray.length);
            if (random % 2 !== 0){
              random -= 1;
            }

            // while (this.checkArray(this.state.saveNumbers, random)){
            //   random = Math.floor(Math.random() * this.state.stringArray.length);
            //   if (random % 2 !== 0){
            //     random -= 1;
            //   }
            // }

            // if(!this.checkArray(this.state.saveNumbers, random)){
            //   this.state.saveNumbers.push(random);
            // } 

            this.state.stringArray[random] = prompt[random / 2].toUpperCase();
            this.setState ({ bool: false})
          }
        }
    }

    componentDidMount() {
        this.Start();
        this.intervalId = setInterval(this.timer.bind(this), 500);
        this.getSessionDatabaseRef().on("value", snapshot => {
          if (snapshot.val() !== null) {
            this.onSessionDataChanged(snapshot.val());
          }
        });
    
        this.getSessionMetadataDatabaseRef().on("value", snapshot => {
          let data = snapshot.val();
          if (data !== null) {
            let sessionMetadata = {
              creator: data.creator,
              users: data.users,
            }
            if (data.type in gameData) {
              sessionMetadata.title = gameData[data.type].title;
            }
            let newState = this.state || {};
            newState.metadata = sessionMetadata;
            this.setState(newState);
            this.onSessionMetadataChanged(data);
          }
        });
    }

    Start(){
      let prompt = this.state.words[this.state.index];
      let sub = [] ;

      if (this.getMyUserId() === this.getSessionCreatorUserId()){   
        this.setState({ meDrawer: true})
      } else {
        this.setState({ meDrawer: false})
        for(let i = 0; i < prompt.length; i++){
            sub.push("_");
            sub.push(" ");
        }    
      }

      this.setState({ 
        stringArray: sub, 
        play: true,
        fakeCount: 10,
        currentCount: 60, 
        // saveNumbers: [],
      });
      this.displayData = [];

      let restart = [];
      for (let i = 0; i < this.state.answered.length; i++){
        restart[i] = false;
      }
      this.setState({ answered: restart})

    }

    Next(){
      if (this.state.index + 2 > this.state.words.length){
        this.setState({  
          index: 0,
        });
      } else {
        this.setState({  
          index: this.state.index + 1,
        });
      }

      // if (this.state.userDrawer + 1 > this.state.gameUsers.length){
      //   this.setState({ userDrawer: 0});
      // } else {
      //   this.setState({ userDrawer: this.state.userDrawer + 1 });
      // }
    }

    Show(){
      let prompt = this.state.words[this.state.index];
      let sub = [] 
      for(let i = 0; i < prompt.length; i++){
          sub.push(prompt[i].toUpperCase());
          sub.push(" ");
      }

      this.setState({  
        stringArray: sub,
      });

    }

    search(array, user){
        for (let i = 0; i < array.length; i++){
          if (user === array[i]){
            return i;
          }
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

    handleKeyEvent = (event) => {
      if (event.key === "Enter" && this.state.postVal.trim() !== "" && this.state.play) {
        this.appendDataChat();
      }
    }

    appendDataChat = () => {
      if (this.state.postVal.toLowerCase() === this.state.words[this.state.index]){
        if (this.state.meDrawer){
          this.displayData.push(<div style= {{color: "orange"}}>Why is {UserApi.getName(this.getMyUserId())} tryna cheat?</div>)
        } else {
          // if (this.state.answered[this.search(this.state.gameUsers, this.getMyUserId())] === false){
          //   this.state.answered[this.search(this.state.gameUsers, this.getMyUserId())] = true;
          //   this.state.points[this.search(this.state.gameUsers, this.getMyUserId())] = this.state.points[this.search(this.state.gameUsers, this.getMyUserId())] + 1;
          //   this.displayData.push(<div style= {{color: "green"}}><img style={{height: "15px", margin: "5px 5px 0 5px"}} src={UserApi.getPhotoUrl(this.getMyUserId())}></img>{UserApi.getName(this.getMyUserId())} got the word correct!</div>)
          // } else {
          //   this.displayData.push(<div style= {{color: "red"}}>{UserApi.getName(this.getMyUserId())} already got the point.</div>)
          
        }
      } else  {
        this.displayData.push(<div><img style={{height: "15px", margin: "5px 5px 0 5px"}} src={UserApi.getPhotoUrl(this.getMyUserId())}></img>{UserApi.getName(this.getMyUserId())}: {this.state.postVal}</div>)
      }
  
      this.setState({
        showData: this.displayData,
        postVal: "",
      })
      
    }

    changeText = (letters) => {
      this.setState({ postVal: letters })
    }

    clearBoard(){
      this.saveableCanvas.clear();
    };
    
    undoBoard = () => {
      this.saveableCanvas.undo();
    }

    changeColor = (type) => {
      this.setState({ color: type});
    }

    changeRadius = (number) => {
      this.setState({ brushRadius: number})
    }

    save = () => {
      this.setState({ saveData: this.saveableCanvas.getSaveData()});
      this.changeInfo();
    }

    changeInfo(){
      let information = {
      saveData: this.state.saveData,
      currentCount : this.state.currentCount, 
      fakeCount: this.state.fakeCount,
      play: this.state.play, 
      index: this.state.index, 
      words: this.state.words, 
      stringArray: this.state.stringArray,
      once: this.state.once,
      // saveNumbers: this.state.saveNumbers,
      // gameUsers: this.state.gameUsers,
      userDrawer: this.state.userDrawer,
      showData: this.state.showData,
      postVal: this.state.postVal,
      points: this.state.points, 
      onScreen: this.state.onScreen,
      answered: this.state.answered,
      displayData: this.displayData,
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
        index: data.index, 
        stringArray: data.stringArray,
        once: data.once,
        blankLetters: data.blankLetters,
        // saveNumbers: data.saveNumbers,
        // gameUsers: data.gameUsers,
        gameUsersPics: data.gameUsersPics,
        userDrawer: data.userDrawer,
        saveData: data.saveData,
        showData: data.showData,
        postVal: data.postVal,
        points: data.points, 
        onScreen: data.onScreen,
        answered: data.answered,
        displayData: data.displayData,
      })
      console.log("On session data change");
      console.log(this.state);

    }

    render() {

        return (
          <div style= {{marginLeft: "2%"}}>
            <div className= "Players">
              {/* <Player 
                // people= {this.state.gameUsers} 
                pics= {this.state.gameUsersPics}
                screen= {this.state.onScreen}
                points= {this.state.points}
                photos= {this.state.gameUsersPics}
                /> */}
            </div>
            <div className= "Timer">
              {/* <Timer 
                time= {this.state.currentCount} 
                break= {!this.state.play} 
                fake= {this.state.fakeCount}
                /> */}
            </div>
            <div className= "Board">
                <div className= "middle">
                    {this.state.meDrawer && this.state.play && 
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
                    {!this.state.meDrawer && this.state.play && 
                    <CanvasDraw
                        style={{
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                        brushColor={this.state.color}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        brushRadius={this.state.brushRadius}
                        canvasWidth= "700px"
                        lazyRadius= {this.state.sum}
                        disabled= "true"
                        hideGrid= "true"
                        saveData= {this.state.saveData}
                    />  
                    }
                </div>
                <button onClick= {() => this.save()}>save</button>
                <button onClick= {() => this.load()}>show</button>
              {this.state.play && 
              <Board 
                  playTime= {this.state.play} 
                  drawer= {this.state.meDrawer} 
                  change= {() => this.changeInfo} 
                  saveData= {this.state.saveData} 
                  save= {this.save} 
                  load= {this.load} 
                  clear= {this.clearBoard} 
                  undo= {this.undoBoard} 
                  color= {this.changeColor} 
                  radius= {this.changeRadius} 
                  brushRadius= {this.state.brushRadius}
                  saveAble= {this.saveableCanvas}
                
                />}
            </div>
            <div className= "Word">
              {/* <Word 
                time= {this.state.currentCount} 
                word= {this.state.stringArray} 
                drawer= {this.state.meDrawer} 
                playTime= {this.state.play}
              /> */}
            </div>
            <div className= "Chat">
              {/* <Chat 
                playTime= {this.state.play} 
                answer= {prompt} 
                people= {this.state.gameUsers} 
                drawer= {this.state.meDrawer}
                display= {this.displayData}
                text= {this.state.postVal}
                changeText= {this.changeText}
                handle= {this.handleKeyEvent}
                append= {this.appendDataChat}
              /> */}
            </div>
          </div>
        );
      }
    }