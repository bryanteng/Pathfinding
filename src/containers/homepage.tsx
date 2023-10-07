import React, { Component } from "react";
import Maze from "../components/maze";

export default class homepage extends Component {

  render() {
    return (
      <div>
        <h1> Pathfinding </h1>
        <Maze />
      </div>
    );
  }
}