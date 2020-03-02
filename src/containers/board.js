import React, { Component } from 'react'
import Logo from "../edit_icon.png"
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
    this.setState({[event.target.id]: +val},()=>{
      let yArr = "0".repeat(this.state.y_coord).split('').map(x=>+x)
      let arr = Array.from({length:this.state.x_coord}).map(x=>yArr.slice())
      let board = arr.slice()
      this.setState({boardState: board})
    })
  }

  clickedCell = (event) =>{
    console.log(event.target.getAttribute('loc'))
    if(this.state.editStart){
      this.setState({start: event.target.getAttribute('loc'), editStart: false})
    }else if(this.state.editEnd){
      this.setState({end: event.target.getAttribute('loc'), editEnd: false})
    }
  }

  buttonClick = (event) =>{
    this.setState({[event.target.id]: !this.state[event.target.id]}, ()=>{console.log(this.state)} )
  }

  solveClick = (event) =>{
    let start = this.state.start.split(",").map(x=> +x)
    let end = this.state.end.split(",").map(x=> +x)

    let board = aStar(this.state.boardState, start, end)
    this.setState({boardState: board})
  }

  render(){
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
        <img src={Logo} alt="website logo" />
        <button id="solve" onClick={this.solveClick}>solve path</button>

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
