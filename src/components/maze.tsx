import React, { useState, useEffect } from "react";
import Cell from "../components/cell";
import aStar from "../util/aStar";
import Node from "../classes/Node"

const Maze = ({ onClick, algoChoice }) => {
  const [board, setBoard] = useState([
    [new Node("0,0",0)]
  ]);
  const [length, lengthInput] = useInput({ type: "number" });
  const [width, widthInput] = useInput({ type: "number" });
  const [start, setStart] = useState("0,0");
  const [isChangingStart, setIsChangingStart] = useState(false);
  const [end, setEnd] = useState(`${board[0].length - 1},${board.length - 1}`);
  const [isChangingEnd, setIsChangingEnd] = useState(false);
  const isValidPos = (x, y) => x >= 0 && x < board[0].length && y >= 0 && y < board.length;
  const [changeQueue, setChangeQueue] = useState([])

  useEffect(() => {
    setCleanBoardState()
    console.log("setCleanBoardState", start, end)
    console.table(board)
  }, [length, width, start, end]);

  useEffect(() => {
    for(let i = 0; i < changeQueue.length; i++){
      const changeInQueue = changeQueue[0]
      console.log("changeQueue", changeQueue[0])
      updateNodeValueAtPos(changeInQueue.value, changeInQueue.pos)
    }
    setChangeQueue([])
  }, [changeQueue.length]);


  useEffect(()=> {
    console.log("board updated", board)
    
    const [startX, startY] = start.split(",").map(Number)
    if(!isValidPos(startX, startY)){
      setBoardStartLocation("0,0");
    }

    const [endX, endY] = end.split(",").map(Number);
    console.log("end shift", end, isValidPos(endX,endY))
    if (!isValidPos(endX, endY) || end === start) {
      setBoardEndLocation(`${board[0].length - 1},${board.length - 1}`);
    }
  }, [board])

  function useInput({ type }) {
    const [value, setValue] = useState(10);

    function handleChange(value: number) {
      if (value > 20) return
      if (value < 5) return
      setValue(value)
    }

    const input = <input value={value} onChange={e => handleChange(+e.target.value)} type={type} />;
    return [value, input];
  }

  const setCleanBoardState = () => {
    const maze: Node[][] = []
    for(let i = 0; i < length; i++){
      let row = []
      for(let j = 0; j < width; j++){
        let node = new Node(`${i},${j}`, 0)
        row.push(node)
      }
      maze.push(row)
    }

    const [startX, startY] = start.split(",")
    maze[startX][startY].value = "S"

    const [endX, endY] = end.split(",");
    maze[endX][endY].value = "E";

    setBoard(maze);

    return maze
  }

  const onCellClick = (event) => {
    console.log(event.target.id);
    const { id, draggable} = event.target
    if(draggable) return // dont want this to work on a start/end node
    const node = getNodeAtPos(event.target.id)

    if(!node) return; // don't add fake changes to change queue

    setChangeQueue((prevChanges) => [
      ...prevChanges,
      {
        value: "x",
        pos: id 
      }
    ]);
    setBoard(board)
  };

  const onMouseDown = (event) => {
    const clickedCell = event.target.id;
    if (clickedCell === start) {
      setIsChangingStart(true);
      setIsChangingEnd(false);
    } else if (clickedCell === end) {
      setIsChangingEnd(true);
      setIsChangingStart(false);
    }
  };

  const onMouseUp = (event) => {
    const newLocation = event.target.id;
    console.log("mouseUp", event.target.draggable)
    if (!isChangingStart && !isChangingEnd) return;
    if (newLocation && event.target.draggable === false) {
      if (isChangingStart) {
        setBoardStartLocation(newLocation);
      } else if (isChangingEnd) {
        setBoardEndLocation(newLocation);
      }
    }
    setIsChangingStart(false)
    setIsChangingEnd(false)

  };

  const setBoardStartLocation = (newStartLocation) => {
    console.log("setBoardStartLocation", newStartLocation);
    if(newStartLocation === start) return
    const prevNode = getNodeAtPos(start)

    const [x, y] = newStartLocation.split(",")
    if (isValidPos(x, y)) {
      setStart(newStartLocation)
      updateNodeValueAtPos("S", newStartLocation);
      if (prevNode) prevNode.value = 0

    }
  };

  const setBoardEndLocation = (newEndLocation) => {
    console.log("setBoardEndLocation", newEndLocation);
    if(newEndLocation === end) return;

    const prevNode = getNodeAtPos(end)
    console.log("prevNode", prevNode, newEndLocation, getNodeAtPos(newEndLocation));

    const [x, y] = newEndLocation.split(",")
    if (isValidPos(x, y)) {
      setEnd(newEndLocation)
      updateNodeValueAtPos("S", newEndLocation);
      if (prevNode) prevNode.value = 0

    }
  };

  const solveClick = () => {
    console.log("*** solve", getNodeAtPos(start), getNodeAtPos(end), board);
    setCleanBoardState()
    aStar(board, getNodeAtPos(start), getNodeAtPos(end), setBoard);
    console.log(board);
  };

  const mapClick = () => {
    const maze = board.map(row => row.map(val => val.value ))
    console.table(maze)
  }

  const getNodeAtPos = (pos: string, reverse: boolean = false): Node => {
    const [x,y] = pos.split(",")
    if(isValidPos(x,y)){
      if(!reverse){
        const nodeAtPos = board[y][x]
        if (nodeAtPos) return nodeAtPos
      } else {
        const nodeAtPos = board[x][y]
        if (nodeAtPos) return nodeAtPos
      }
    }
    return undefined
  }

  const updateNodeValueAtPos = (value, pos: string) => {
    const [x, y] = pos.split(",")
    if(isValidPos(x,y)){
      const maze = board.slice()
      maze[x][y].value = value
      console.table(maze.map(row => row.map(x => x.value)))

      setBoard(maze)
      return getNodeAtPos(pos)
    }

    return undefined
  }

  const reverseDisplay = (pos) => {
    return pos.split(",")
      .reverse()
      .map(num => +num +1)
      .join(",")
  }

  return (
    <div>
      {lengthInput}x{widthInput} <br />
      start: {reverseDisplay(start)} end: {reverseDisplay(end)}
      <button onClick={solveClick}> solve </button>
      <button onClick={setCleanBoardState}> clear </button>
      <button onClick={mapClick}> log map </button>
      <table className="maze">
        <tbody>
          {board.map((line, row_index) => {
            return (
              <tr key={row_index} className="line">
                {line.map(node => (
                  <Cell
                    key={node.pos}
                    onClick={onCellClick}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    node={node}
                    value={node.value}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Maze;
