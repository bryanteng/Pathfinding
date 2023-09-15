// const Node = require("../classes/Node").default;

// export default function DFS(maze, start, end) {
//   let startNode = new Node(undefined, start);
//   let endNode = new Node(undefined, end);

//   const stack = [startNode];
//   maze[startNode.pos[0]][startNode.pos[1]] = "x";

//   const directs = [
//     [-1, -1],
//     [-1, 0],
//     [-1, 1],
//     [0, 1],
//     [1, 1],
//     [1, 0],
//     [1, -1],
//     [0, -1],
//   ];
//   const N = maze.length;
//   const M = maze[0].length;
//   const isValidPos = (x, y) => x >= 0 && x < N && y >= 0 && y < M;
//   if (!isValidPos(start[0], start[1]) || !isValidPos(end[0], end[1])) {
//     alert("please pick a start and end point within the board");
//     return maze;
//   }

//   while (stack.length > 0) {
//     let currentNode = stack.pop();

//     if (
//       currentNode.pos[0] == endNode.pos[0] &&
//       currentNode.pos[1] == endNode.pos[1]
//     ) {
//       let path = [];
//       let current = currentNode;
//       while (current) {
//         path.push(current.pos);
//         current = current.parent;
//       }
//       for (let node of path) {
//         maze[node[0]][node[1]] = "O";
//       }
//       return maze;
//       // return path.reverse()
//     }

//     for (let [moveX, moveY] of directs) {
//       const nextX = currentNode.pos[0] + moveX;
//       const nextY = currentNode.pos[1] + moveY;
//       if (isValidPos(nextX, nextY) && maze[nextX][nextY] == false) {
//         let new_node = new Node(currentNode, [nextX, nextY]);
//         stack.push(new_node);
//         maze[nextX][nextY] = "x";
//       }
//     }
//   }

//   return -1;
// }


import Node from "../classes/Node";

export default function DFS(
  grid: Node[][],
  start: Node,
  end: Node
) {
  const stack = [start];
  const visitedNodes = new Set();

  while (stack.length > 0) {
    const currentNode = stack.pop();

    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path = [];
      let current = currentNode;
      while (current) {
        if (
          !(current.x === start.x && current.y === start.y) &&
          !(end.x === current.x && end.y === current.y)
        ) {
          path.unshift({ x: current.x, y: current.y });
        }
        current = current.parent;
      }
      return [path, grid];
    }

    visitedNodes.add(currentNode);

    const neighbors = [
      { x: currentNode.x, y: currentNode.y - 1 },
      { x: currentNode.x, y: currentNode.y + 1 },
      { x: currentNode.x - 1, y: currentNode.y },
      { x: currentNode.x + 1, y: currentNode.y },
      { x: currentNode.x - 1, y: currentNode.y - 1 },
      { x: currentNode.x - 1, y: currentNode.y + 1 },
      { x: currentNode.x + 1, y: currentNode.y - 1 },
      { x: currentNode.x + 1, y: currentNode.y + 1 }
    ];

    for (const neighbor of neighbors) {
      if (
        neighbor.x < 0 ||
        neighbor.x >= grid[0].length ||
        neighbor.y < 0 ||
        neighbor.y >= grid.length ||
        visitedNodes.has(grid[neighbor.y][neighbor.x])
      ) {
        continue;
      }

      if (grid[neighbor.y][neighbor.x].value === "W") {
        continue; // Skip walls
      }

      const newNode = grid[neighbor.y][neighbor.x];
      newNode.parent = currentNode;
      stack.push(newNode);
    }
  }

  return undefined; // No path found
}