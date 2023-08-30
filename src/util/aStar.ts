import Node from "../classes/Node";

export default function aStar(maze: Node[][], start: Node, end: Node, setBoard) {
  let startNode: Node = start;
  let endNode: Node = end;
  let open_list: Node[] = [startNode];
  let closed_list: Node[] = [];

  const getNodeAtPos = (pos: string): Node => {
    const [x, y] = pos.split(",")
    if (isValidPos(x, y)) {
      const nodeAtPos = maze[y][x]
      if (nodeAtPos) return nodeAtPos
    }
    return undefined
  }

  const N = maze.length;
  const M = maze[0].length;
  const isValidPos = (x, y) => x >= 0 && x < N && y >= 0 && y < M;
  if (!isValidPos(start.y, start.x) || !isValidPos(end.y, end.x)) {
    alert("please pick a start and end point within the board");
    return maze;
  }

  while (open_list.length > 0) {
    let currentNode = open_list[0];
    let currentIndex = 0;
    open_list.forEach(function (node, i) {
      if (node.f < currentNode.f) {
        currentNode = node;
        currentIndex = i;
      }
    });

    let pop = open_list.splice(currentIndex, 1)[0];
    closed_list.push(currentNode);

    // setBoard(maze)
    // console.log(setBoard)
    if (
      currentNode.y === endNode.y &&
      currentNode.x === endNode.x
    ) {
      console.log("currentNode", currentNode)
      // setBoard(maze)
      setInterval(() => {
        let path = [];
        let current = currentNode;
        while (current) {
          path.push(current);
          current = current.parent;
        }
        for (let node of open_list) {
          node.value = "x";
        }
        for (let node of path) {
          node.value = "0";
          setBoard(node.pos)
        }
        // setBoard(maze);
        console.table(maze);
      }, 1000);

      return maze;
    }

    let children = [];

    let direction = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    for (let [moveX, moveY] of direction) {
      const nextX = currentNode.x + moveX;
      const nextY = currentNode.y + moveY;
      const nextNode: Node = getNodeAtPos(`${nextX},${nextY}`)
      if( nextNode && nextNode.value !== "W"){
        if (
          isValidPos(nextX, nextY) &&
          nextNode.value === 0 
        ) {
          nextNode.parent = currentNode
          nextNode.value = "x"
          children.push(nextNode);
        }
      }
    }

    for (let child of children) {
      for (let closed_child of closed_list) {
        if (
          child.y === closed_child.y &&
          child.x === closed_child.x
        )
          continue;
        child.setG(currentNode.g + 1);
        child.setH((child.y - endNode.y) ** 2 + (child.x - endNode.x) ** 2)
        child.f = child.g + child.h;

        for (let open_node of open_list) {
          if (child === open_node && child.g > open_node.g) continue;
        }
        open_list.push(child);
        currentNode.value = "x"
        // setBoard(maze);
      }
    }
  }
  // setBoard(maze)
  alert("path not possible");
  return maze;
}
//create nested array
// let x = 10
// let y = 10
//
// let yArr = "0repeat(y).split('').map(x=>+x)
// let arr = Array.from({length:x}).map(x=>yArr.slice())
// let board = arr.slice()

//start pointx
// let startX = 9
// let startY = 9
// let start = [startX,startY]

//end point
// let endX = 0
// let endY = 0
// let end = [endX, endY]
// let path = aStar(board, start, end)
// console.log(path,"done");
// module.exports = aStar
