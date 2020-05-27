import React from 'react';
import firebase from 'firebase';
import CanvasDraw from "react-canvas-draw"; 
import './Pic.css';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = { color: "#000000", 
        brushRadius: 5, 
        sum: 0, 
        saveData: null,
    }

        this.saveableCanvas = React.createRef();
        };
        
    // clearBoard(){
    //     this.saveableCanvas.clear();
    // };
    
    // undoBoard(){
    //     this.saveableCanvas.undo();
    // }

    // changeColor(type){
    //     this.setState({ color: type});
    // }

    // save(){
    //     this.setState({ saveData: this.saveableCanvas.getSaveData()});
    //     let information = {
    //         saveData: this.saveableCanvas.getSaveData()
    //     }
    //     this.getSessionDatabaseRef().set(information, error => {
    //         if (error) {
    //           console.error("Error updating Kevin state", error);
    //         }
    //       });
    // }

    // load(){
    //     this.saveableCanvas.loadSaveData(this.state.saveData, true)
    // }

    render() {

        return(
            <div>

                <div className= "middle">
                    {/* {this.props.drawer &&
                    <CanvasDraw
                        style={{
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                        brushColor={this.state.color}
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushRadius={this.state.brushRadius}
                        canvasWidth= "700px"
                        lazyRadius= {this.state.sum}
                        onChange=  {() => this.props.save()}
                        hideGrid= "true"
                    />
                    }
                    {!this.props.drawer &&
                    <CanvasDraw
                        style={{
                            boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                        brushColor={this.state.color}
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushRadius={this.state.brushRadius}
                        canvasWidth= "700px"
                        lazyRadius= {this.state.sum}
                        // onChange= {this.load()}
                        disabled= "true"
                        hideGrid= "true"
                        saveData= {this.props.saveData}
                    />  
                    } */}
                </div>
                
                {this.props.drawer && <div>
                <div className= "UI">
                    <button className= "clear" onClick= {() => {this.props.clear();}}>Clear</button>
                    <button className= "undo" onClick= {() => {this.props.undo();}}>Undo</button>
                    <img className= "White" onClick= {() => {this.props.color("#ffffff"); }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToa7jXAtJYB9GUSKjU90HhIw_4-xTpSYIwsbk5cFEY8CGa37dE&usqp=CAU"></img>
                </div>

                <div className= "UI1">
                    <label>
                        Pen Radius: 
                        <input
                            type="number"
                            value={this.props.brush}
                            onChange={e =>
                                {this.props.radius(e.target.value)}
                            }
                        />
                    </label>
                </div>

                <div>
                    <div className= "Colors1">
                        <button className= "Black" onClick= {() => this.props.color("#000000")}>Black</button>
                        <button className= "dBlue" onClick= {() => this.props.color("#003366")}>Dark Blue</button>
                        <button className= "Brown" onClick= {() => this.props.color("#A52A2A")}>Brown</button>
                        <button className= "Purple" onClick= {() => this.props.color("#6a0dad")}>Purple</button>
                        <button className= "Red" onClick= {() => this.props.color("#FF0000")}>Red</button>    
                        <button className= "Green" onClick= {() => this.props.color("#008000")}>Green</button>                    
                    </div>
                </div>
                
                <div>
                    <div className= "Colors2">
                        <button className= "Blue" onClick= {() => this.props.color("#00FFFF")}> Light Blue</button>
                        <button className= "Yellow" onClick= {() => this.props.color("#FFFF00")}>Yellow</button>
                        <button className= "Pink" onClick= {() => this.props.color("#FF69B4")}>Pink</button>
                        <button className= "Tan" onClick= {() => this.props.color("#F0E3DF")}>Tan</button>
                        <button className= "tDawn" onClick= {() => this.props.color("#BDC3B9")}>Gray</button>
                    </div>
                </div>
            </div>}

            </div>
        );
    }

}