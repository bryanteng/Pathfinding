import React, { Component } from 'react'

export default class board extends Component{

  state={
    x_coord:10,
    y_coord:10,
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

  render(){
    return(
      <div>
        <h1> here </h1>
        <input type="text" pattern="[0-9]*" value={this.state.x_coord} id="x_coord" onChange={this.change_coord}></input>
        <input type="text" pattern="[0-9]*" value={this.state.y_coord} id="y_coord" onChange={this.change_coord}></input>
        <table className="maze">
          {this.state.boardState.map((line,index) =>{
          return <tr className="line">{line.map((block,index)=>{
                  return <td className="block" style={{backgroundColor: block ? block : null}} >{block}</td>
              })}</tr>
          }) }
        </table>
      </div>
    )
  }
}
