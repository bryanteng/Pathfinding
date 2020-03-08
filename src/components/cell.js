import React, { Component } from 'react'

export default class Cell extends Component{
  constructor(props) {
    super(props);
  }


  render(){
    console.log(this.props)
    const {key, loc, block} = this.props
    return(
      <td className="block" loc={loc} onClick={this.props.onClick}>{block}</td>
    )
  }
}
