import React, { Component } from 'react'
import Logo from "../edit_icon.png"
import BFS from '../util/BFS'
import aStar from '../util/aStar'

import Cell from '../components/cell'

export default class board extends Component{

  state={
    x_coord:10,
    y_coord:10,
    start:"1,1",
    editStart: false,
    end:"7,7",
    editEnd: false,
    selectedOption: "aStar",
    createWall: true,
    walls: [],
    boardState:[[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]]
    }

    // componentDidMount(){
      // Math.floor(Math.random()*10)
    // }

  change_coord = (event) =>{
    let val = (event.target.validity.valid) ? event.target.value : this.state[event.target.id]
    if(val<= 5){
      val = 5
    }else if( val > 20){
      val = 20
    }
    this.clearWalls()
    this.setState({[event.target.id]: +val},()=>{
      let board = this.cleanBoard()
      this.setState({boardState: board})
    })
  }

  clickedCell = (event) =>{
    if(this.state.editStart){
      this.setState({start: event.target.getAttribute('loc'), editStart: false})
    }else if(this.state.editEnd){
      this.setState({end: event.target.getAttribute('loc'), editEnd: false})
    }else if(this.state.createWall){
      let loc = event.target.getAttribute('loc').split(",")
      let board = this.state.boardState
      let walls = this.state.walls
      if(board[loc[0]][loc[1]] == "W"){
        walls = walls.filter(x=>{
          if(x[0] == loc[0] && x[1] == loc[1]) return false
          return true
        } )
        board[loc[0]][loc[1]] = 0
      }else{
        walls = walls.concat([loc])
        board[loc[0]][loc[1]] = "W"
      }

      this.setState({boardState: board, walls: walls})
    }
  }

  buttonClick = (event) =>{
    this.setState({[event.target.id]: !this.state[event.target.id]} )
  }

  solveClick = (event) =>{
    let start = this.state.start.split(",").map(x=> +x)
    let end = this.state.end.split(",").map(x=> +x)
    let board
    if(this.state.selectedOption == "aStar"){
      board = aStar(this.cleanBoard(), start, end)
    }else if(this.state.selectedOption == "BFS"){
      board = BFS(this.cleanBoard(), start, end)
    }
    board[start[0]][start[1]] = "S"
    board[end[0]][end[1]] = "E"
    this.setState({boardState: board})
  }

  resetClick = () =>{
    let board = this.cleanBoard()
    this.setState({boardState: board})
  }

   cleanBoard=()=>{
    let yArr = "0".repeat(this.state.y_coord).split('').map(x=>+x)
    let arr = Array.from({length:this.state.x_coord}).map(x=>yArr.slice())
    let board = arr.slice()
    for(let [w1, w2] of this.state.walls){
      board[w1][w2] = "W"
    }
    return board
  }

  clearWalls = () =>{
    let board = this.state.boardState
    for(let [w1, w2] of this.state.walls){
      board[w1][w2] = 0
    }
    this.setState({walls: [], boardState: board}, ()=> this.cleanBoard())
  }

  optionChange = (event) =>{
    this.setState({selectedOption: event.target.value})
  }

  render(){
    console.log(this.state)
    const {x_coord, y_coord, start, end, editStart, editEnd, createWall, selectedOption, boardState} = this.state
    return(
      <div>
        <h1> Pathfinding </h1>
        {/*<label> number of rows: </label> */}
        <input className="field" type="text" pattern="[0-9]*" value={x_coord} id="x_coord" onChange={this.change_coord}></input>
        {/* <label> number of columns: </label>  */}x 
        <input className="field" type="text" pattern="[0-9]*" value={y_coord} id="y_coord" onChange={this.change_coord}></input>
        <label> start:</label>
        <label className={editStart? "editing" : "editable"} id="editStart" src="click to change" onClick={this.buttonClick}> [{start}] </label>
        <label>end:</label>
        <label className={editEnd? "editing" : "editable"} id="editEnd" src="click to change" onClick={this.buttonClick}> [{end}] </label>
        <button id="createWall" onClick={this.buttonClick}>{createWall ? "turn off wall creation" : "click to create walls"}</button>
        <form>
          <div className="radio">
            <label className={selectedOption == "aStar" ? "selected" : null} >
              <input type="radio" value="aStar" onChange={this.optionChange} checked={selectedOption === 'aStar'} />
              A* Algorithm
            </label>
          </div>
          <div className="radio">
            <label className={selectedOption == "BFS" ? "selected" : null} >
              <input type="radio" value="BFS" onChange={this.optionChange} checked={selectedOption === 'BFS'} />
              Breadth First Search Algorithm
            </label>
          </div>
        </form>

        <button id="solve" onClick={this.solveClick}>solve path</button>
        <button id="reset" onClick={this.resetClick}>reset board</button>
        <button id="clearWalls" onClick={this.clearWalls}>clear walls</button>

        <table className="maze">
        <tbody>
          {boardState.map((line,row_index) =>{
          return <tr  key={row_index} className="line">{line.map((block,index)=>{
                  let loc = row_index+","+index
                  return <Cell classN={start == loc || end == loc ? "node" : null} loc={loc} start={start} end={end} style={{backgroundColor: block ? block : null}} onClick={this.clickedCell.bind(this)} block={block}/>
              })}</tr>
          }) }
          </tbody>
        </table>
      </div>
    )
  }
}
