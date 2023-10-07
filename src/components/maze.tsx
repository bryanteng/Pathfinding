import React, { useState, useEffect } from "react";
import Cell from "../components/cell";
import aStar from "../util/aStar";
import DFS from "../util/DFS";
import BFS from "../util/BFS";
import GBFS from "../util/GBFS";
import UCS from "../util/UCS";
import Node from "../classes/Node"
import '../styles/maze.css'

interface Path {
    x: string,
    y: string
}


interface SearchAlgorithm {
  name: string; // The name of the search algorithm
  execute: () => Promise<any>; // A function that executes the algorithm and returns a promise
  executionTime?: string; // Optional property to store the execution time
}

const Maze = () => {
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
  const [executionTimesString, setExecutionTimesString] = useState('');
  const [renderer, setRerender] = useState(0);


  const searchAlgorithms: SearchAlgorithm[] = [
    {
      name: 'A* Algorithm',
      execute: () => Promise.resolve(aStar(board, getNodeAtPos(start), getNodeAtPos(end))),
    },
    {
      name: 'Depth First Search Algorithm',
      execute: () => Promise.resolve(DFS(board, getNodeAtPos(start), getNodeAtPos(end))),
    },
    {
      name: 'Breadth First Search Algorithm',
      execute: () => Promise.resolve(BFS(board, getNodeAtPos(start), getNodeAtPos(end))),
    },
    {
      name: 'Greedy Breadth First Search Algorithm',
      execute: () => Promise.resolve(GBFS(board, getNodeAtPos(start), getNodeAtPos(end))),
    },
    {
      name: 'Uniform Cost Search Algorithm',
      execute: () => Promise.resolve(UCS(board, getNodeAtPos(start), getNodeAtPos(end))),
    },
    // Add more search algorithms and execution functions
  ];

  useEffect(() => {
    setCleanBoardState()
  }, [length, width, start, end, walls.size, path.length]);


  useEffect(()=> {
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

  const clearBoard = () => {
    const newBoard = board.map((row) =>
      row.map((node) => {
        if (node.value === "W") {
          return new Node(node.pos, "W");
        }
        if (node.value === "S") {
          return new Node(node.pos, "S");
        }
        if (node.value === "E") {
          return new Node(node.pos, "E");
        }
        return new Node(node.pos, 0);
      })
    );

    setPaths([]);
    setBoard(newBoard);
    return newBoard;
  };

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
    if(newEndLocation === end) return;
    const prevNode = getNodeAtPos(end)

    const [y, x] = newEndLocation.split(",")
    if (isValidPos(x, y)) {
      setEnd(newEndLocation)
      updateNodeValueAtPos("E", newEndLocation);

      if (prevNode) prevNode.value = 0

    }
  };

  const solveClick = async () => {
    let executionTimesStr = '';

    for (const algorithm of searchAlgorithms) {
      // Clear the board before starting a new algorithm
      const cleanBoard = clearBoard();

      // Execute the current algorithm
      const startTime = performance.now();
      const results = await algorithm.execute();
      const executionTime = performance.now() - startTime;

      // Update the execution time for the current algorithm
      algorithm.executionTime = `${executionTime}`.substring(0,5);

      // Append the algorithm name and execution time to the string
      executionTimesStr += `${algorithm.name} - Time: ${algorithm.executionTime} ms\n`;

      // Update the board to show the search progress
      const path = results[0];
      if (path && path.length > 0) {
        for (let index = 0; index < path.length; index++) {
          const currentPath = path.slice(0, index + 1);
          setPaths(currentPath);

          // Introduce a delay to visualize the algorithm's progress
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } else {
        alert("Route not possible");
      }

      // Force a re-render to update the execution times and board
      // setRerender((prev) => prev + 1);
    }

    // Update the state with the complete execution times string
    setExecutionTimesString(executionTimesStr);
  };

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
            const board = [...prevBoard];
            board[y][x].value = value;
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
      <div className="left-column">
        {lengthInput}x{widthInput} <br />
        start: {reverseDisplay(start)} end: {reverseDisplay(end)}
        <button onClick={solveClick}> solve </button>
        <button onClick={clearBoard}> clear </button>
        <button onClick={clearWalls}> clear walls</button>
      </div>
      <div className="right-column">
        <h2>Search Algorithms</h2>
        <ul>
          {/* {searchAlgorithms.map((algorithm) => (
            <li key={algorithm.name}>
              {algorithm.name}: {algorithm.executionTime ? `${algorithm.executionTime}ms`: 'Calculating...'}
            </li>
          ))} */}
          {executionTimesString.split("\n").map(algo =>(
          <li key={algo}>
            {algo}
          </li>
          ))}
        </ul>
      </div>
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
