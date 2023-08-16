import React from "react";

const UserOptions = ({ loc, block, start, end, classN, onClick }) => {
  return (
    <div className="UserOptions">
      <h1> Pathfinding </h1>
      {/*<label> number of rows: </label> */}
      <input
        className="field"
        type="text"
        pattern="[0-9]*"
        value={x_coord}
        id="x_coord"
        onChange={this.change_coord}
      />
      {/* <label> number of columns: </label>  */}
      <input
        className="field"
        type="text"
        pattern="[0-9]*"
        value={y_coord}
        id="y_coord"
        onChange={this.change_coord}
      />
      <label> start:</label>
      <label
        className={editStart ? "editing" : "editable"}
        id="editStart"
        src="click to change"
        onClick={this.buttonClick}
      >
        {" "}
        [{start}]{" "}
      </label>
      <label>end:</label>
      <label
        className={editEnd ? "editing" : "editable"}
        id="editEnd"
        src="click to change"
        onClick={this.buttonClick}
      >
        {" "}
        [{end}]{" "}
      </label>
      <button id="createWall" onClick={this.buttonClick}>
        {createWall ? "turn off wall creation" : "click to create walls"}
      </button>
      <form>
        <div className="radio">
          <label className={selectedOption === "aStar" ? "selected" : null}>
            <input
              type="radio"
              value="aStar"
              onChange={this.optionChange}
              checked={selectedOption === "aStar"}
            />
            A* Algorithm
          </label>
        </div>
        <div className="radio">
          <label className={selectedOption === "BFS" ? "selected" : null}>
            <input
              type="radio"
              value="BFS"
              onChange={this.optionChange}
              checked={selectedOption === "BFS"}
            />
            Breadth First Search Algorithm
          </label>
        </div>
        <div className="radio">
          <label className={selectedOption === "DFS" ? "selected" : null}>
            <input
              type="radio"
              value="DFS"
              onChange={this.optionChange}
              checked={selectedOption === "DFS"}
            />
            Depth First Search Algorithm
          </label>
        </div>
      </form>

      <button id="solve" onClick={this.solveClick}>
        solve path
      </button>
      <button id="reset" onClick={this.resetClick}>
        reset board
      </button>
      <button id="clearWalls" onClick={this.clearWalls}>
        clear walls
      </button>
    </div>
  );
};

export default UserOptions;
