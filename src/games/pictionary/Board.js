import React from 'react';
import firebase from 'firebase';
import Chat from './Chat.js';
import CanvasDraw from "react-canvas-draw"; 
import './Pic.css';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = { color: "#000000", brushRadius: 5, sum: 0}

        this.clearBoard = this.clearBoard.bind(this);
        this.undoBoard = this.undoBoard.bind(this);
        };
        
    clearBoard(){
        this.saveableCanvas.clear();
        console.log("HI")
    };
    
    undoBoard(){
        this.saveableCanvas.undo();
    }

    changeColor(type){
        this.setState({ color: type});
    }

    render() {

        return(
            <div>
                <div className= "middle">
                    <CanvasDraw
                        style={{
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                        brushColor={this.state.color}
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushRadius={this.state.brushRadius}
                        onChange={() => console.log("onChange")}
                        canvasWidth= "700px"
                        lazyRadius= {this.state.sum}
                    />
                </div>

                <div className= "UI">
                    <button className= "clear" onClick= {() => this.clearBoard}>Clear</button>
                    <button className= "undo" onClick= {() => this.undoBoard}>Undo</button>
                </div>

                <div className= "UI1">
                    <label>
                        Pen Radius: 
                        <input
                            type="number"
                            value={this.state.brushRadius}
                            onChange={e =>
                                this.setState({ brushRadius: parseInt(e.target.value, 10) })
                            }
                        />
                    </label>
                </div>

                <div>
                    <div className= "Colors1">
                        <button className= "Black" onClick= {() => this.changeColor("#000000")}>Black</button>
                        <button className= "Blue" onClick= {() => this.changeColor("#00FFFF")}> Light Blue</button>
                        <button className= "Green" onClick= {() => this.changeColor("#008000")}>Green</button>
                        <button className= "Yellow" onClick= {() => this.changeColor("#FFFF00")}>Yellow</button>
                    </div>
                </div>
                
                <div>
                    <div className= "Colors2">
                        <button className= "Red" onClick= {() => this.changeColor("#FF0000")}>Red</button>
                        <button className= "Purple" onClick= {() => this.changeColor("#6a0dad")}>Purple</button>
                        <button className= "Pink" onClick= {() => this.changeColor("#FF69B4")}>Pink</button>
                        <button className= "dBlue" onClick= {() => this.changeColor("#003366")}>Dark Blue</button>
                    </div>
                </div>
            </div>
        );
    }

}