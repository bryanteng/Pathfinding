import React, { useState, useEffect } from "react";
import Cell from "../components/cell";
import aStar from "../util/aStar";
import DFS from "../util/DFS";
import Node from "../classes/Node"


interface Path {
    x: string,
    y: string
}

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
  const [walls, setWalls] = useState(new Set<string>())
  const [path, setPaths] = useState([])
  const isValidPos = (x, y) => x >= 0 && x < board[0].length && y >= 0 && y < board.length;

  useEffect(() => {
    setCleanBoardState()
  }, [length, width, start, end, walls.size, path.length]);


  useEffect(()=> {
    console.log("board updated", board, length, width, start,end)
    
    const [startY, startX] = start.split(",").map(Number)
    if(!isValidPos(startX, startY)){
      setBoardStartLocation("0,0");
    }

    const [endY, endX] = end.split(",").map(Number);
    if (!isValidPos(endX, endY) || end === start) {
      setBoardEndLocation(`${+length - 1},${+width - 1}`);
    }

  }, [length, width, board])

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

  const clearBoard = () => { // clear walls, and paths, leave only start and end positions
      const maze: Node[][] = []
      for (let i = 0; i < length; i++) {
          let row = []
          for (let j = 0; j < width; j++) {
              let node = new Node(`${i},${j}`, 0)
              row.push(node)
          }
          maze.push(row)
      }

      const [startY, startX] = start.split(",")
      maze[startY][startX].value = "S"

      const [endY, endX] = end.split(",");
      maze[endY][endX].value = "E"

      setPaths([])
      setWalls(new Set<string>())
      setBoard(maze);
      return maze
  }

  const setCleanBoardState = (prevPath: Path[]= undefined) => {
    const maze: Node[][] = []
    for(let i = 0; i < length; i++){
      let row = []
      for(let j = 0; j < width; j++){
        let node = new Node(`${i},${j}`, 0)
        row.push(node)
      }
      maze.push(row)
    }
    const isValidMazePos = (x, y) => x >= 0 && x < maze[0].length && y >= 0 && y < maze.length;

    if(path.length > 0 ){
        path.forEach(node => {
        maze[node.y][node.x].value = "x"
      })
    } else prevPath?.forEach(node => maze[node.y][node.x].value = 0)

    const validWalls = new Set<string>()
    walls.forEach(wall => {
        const [y, x] = wall.split(",")
        if (isValidMazePos(x, y)) {
            maze[y][x].value = "W"
            validWalls.add(wall)
        }
    })

    const [startY, startX] = start.split(",")
    if (isValidMazePos(startX, startY)) maze[startY][startX].value = "S"
    else {
        maze[0][0].value = "S"
        setBoardStartLocation("0,0")
    }

    const [endY, endX] = end.split(",");
    if (isValidMazePos(endX, endY)) maze[endY][endX].value = "E"
    else {
        maze[+length - 1][+width - 1].value = "E"
        setBoardEndLocation(`${+length - 1},${+width - 1}`)
    }

    setWalls(validWalls)
    setBoard(maze);
    return maze
  }

  const onCellClick = (event) => {
    const { id, draggable} = event.target
    if(draggable) return // dont want this to work on a start/end node
    const node = getNodeAtPos(event.target.id)

    if(!node) return; // don't change if node doesnt exist
    if(node.value === "S" || node.value === "E") return // dont change if start or end

    if(node.value === "W"){
      setWalls(prevWalls => {
        prevWalls.delete(id)
        return new Set(prevWalls)
      })
      updateNodeValueAtPos(0, id)
    } else {
      setWalls(prevWalls => new Set(prevWalls.add(id)))
      updateNodeValueAtPos("W", id)
    }

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

    const [y, x] = newStartLocation.split(",")
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

    const [y, x] = newEndLocation.split(",")
    if (isValidPos(x, y)) {
      setEnd(newEndLocation)
      updateNodeValueAtPos("E", newEndLocation);

      if (prevNode) prevNode.value = 0

    }
  };

  const solveClick = () => {
    console.log("*** solve", getNodeAtPos(start), getNodeAtPos(end), board);
    setCleanBoardState(path)
    setPaths([])
      // const results = aStar(board, getNodeAtPos(start), getNodeAtPos(end))
      const results = DFS(board, getNodeAtPos(start), getNodeAtPos(end))

      const newPath = results[0]
      console.log("results", results)
      if(newPath?.length) {
        let index = 0
        // while(index < newPath.length){
        //   const currPath = newPath.slice(0,index)

        //   setTimeout(() => {
        //       setPaths(currPath)
        //       index++
        //   }, 100);
        // }
        setPaths(newPath) 
      }
      else alert("route not possible")
      // const newBoard = results[1]
      // newBoard.push([])
      // setBoard(newBoard)
    console.log(board);
  };

  const mapClick = () => {
    const maze = board.map(row => row.map(val => val.value ))
    console.table(maze)
      const maze2 = board.map(row => row.map(val => val.visited))
      console.table(maze2)
  }

  const getNodeAtPos = (pos: string, reverse: boolean = false): Node => {
    const [y,x] = pos.split(",")
    if(isValidPos(x,y)){
      const nodeAtPos = board[y][x]
      if (nodeAtPos) return nodeAtPos
    }
    return undefined
  }

  const updateNodeValueAtPos = (value, pos: string) => {
    const [y, x] = pos.split(",")
    if(isValidPos(x,y)){
        setBoard(prevBoard => {
            console.table(prevBoard.map(row => row.map(x => x.value)))
            const board = [...prevBoard];
            board[y][x].value = value;
            console.table(board.map(row => row.map(x => x.value)))
            return board;
        })
    }
    return undefined
  }

  const reverseDisplay = (pos) => {
    return pos.split(",")
      .reverse()
      .map(num => +num +1)
      .join(",")
  }

  const clearWalls = () => {
    setWalls(new Set())
  }

  return (
    <div className="mazePlaceholder">
      {lengthInput}x{widthInput} <br />
      start: {reverseDisplay(start)} end: {reverseDisplay(end)}
      <button onClick={solveClick}> solve </button>
      <button onClick={clearBoard}> clear </button>
      <button onClick={clearWalls}> clear walls</button>

      <button onClick={mapClick}> log map </button>
      <table className="maze">
          <thead>
              <tr>
                  <th></th>
                  {Array.from({ length: +width }, (_, index) => (
                      <th key={index}>{index+1}</th>
                  ))}
              </tr>
          </thead>
        <tbody>
          {board.map((line, row_index) => {
            return (
                <tr key={row_index} className="line"> <span>{row_index + 1}</span>
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