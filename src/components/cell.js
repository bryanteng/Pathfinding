import React, { Component } from 'react'

export default class Cell extends Component{
  render(){
    const {key, loc, block} = this.props
    return(
      <td className="block" key={key} loc={loc} onClick={this.props.onClick}>{block}</td>
    )
  }
}
