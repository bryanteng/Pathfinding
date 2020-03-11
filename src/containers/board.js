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

  change_coord = (event) =>{
    const val = (event.target.validity.valid) ? event.target.value : this.state[event.target.id]
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
    return(
      <div>
        <h1> Pathfinding </h1>
        <label >number of rows: </label>
        <input type="text" pattern="[0-9]*" value={this.state.x_coord} id="x_coord" onChange={this.change_coord}></input>
        <img src={Logo} alt="website logo" />
        <label >number of columns: </label>
        <input type="text" pattern="[0-9]*" value={this.state.y_coord} id="y_coord" onChange={this.change_coord}></input>
        <img src={Logo} alt="website logo" />
        <label>start:[{this.state.start}]</label>
        <button id="editStart" onClick={this.buttonClick}>{this.state.editStart ? "click a cell" : "click to edit start"}</button>
        <img src={Logo} alt="website logo" />
        <label>end:[{this.state.end}]</label>
        <button id="editEnd" onClick={this.buttonClick}>{this.state.editEnd ? "click a cell" : "click to edit end"}</button>
        <button id="createWall" onClick={this.buttonClick}>{this.state.createWall ? "click cells to create a wall" : "click to turn off wall creation"}</button>
        <button id="clearWalls" onClick={this.clearWalls}>clear walls</button>

        <img src={Logo} alt="website logo" />
        <form>
          <div className="radio">
            <label className={this.state.selectedOption == "aStar" ? "selected" : null} >
              <input type="radio" value="aStar" onChange={this.optionChange} checked={this.state.selectedOption === 'aStar'} />
              A* algorithm
            </label>
          </div>
          <div className="radio">
            <label className={this.state.selectedOption == "BFS" ? "selected" : null} >
              <input type="radio" value="BFS" onChange={this.optionChange} checked={this.state.selectedOption === 'BFS'} />
              Breadth first Search Algorithm
            </label>
          </div>
        </form>

        <button id="solve" onClick={this.solveClick}>solve path</button>
        <button id="reset" onClick={this.resetClick}>reset board</button>


        <table className="maze">
        <tbody>
          {this.state.boardState.map((line,row_index) =>{
          return <tr  key={row_index} className="line">{line.map((block,index)=>{
                  return <Cell key={index} loc={[row_index,index]} style={{backgroundColor: block ? block : null}} onClick={this.clickedCell.bind(this)} block={block}/>
              })}</tr>
          }) }
          </tbody>
        </table>
      </div>
    )
  }
}
