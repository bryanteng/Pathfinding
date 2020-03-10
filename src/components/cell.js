import React, { Component } from 'react'

export default class Cell extends Component{
  render(){
    const {key, loc, block} = this.props
    if(block){
      var color = ""
      if(block == "O"){
        color = "LimeGreen"
      }else if(block == "x"){
        color = "#C80003"
      }
    }
    return(
      <td className="block" key={key} loc={loc} style={{backgroundColor: color ? color : null}} onClick={this.props.onClick}>{block}</td>
    )
  }
}
