const Node = require("../classes/Node").default;

export default function BFS(maze, start, end) {
  //start pointx
  // let startX = 0
  // let startY = 0
  let startNode = new Node(undefined, start);
  //end point
  // let endX = 5
  // let endY = 5
  let endNode = new Node(undefined, end);
  const queue = [startNode];
  const directs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  const N = maze.length;
  const M = maze[0].length;
  const isValidPos = (x, y) => x >= 0 && x < N && y >= 0 && y < M;
  if (!isValidPos(start[0], start[1]) || !isValidPos(end[0], end[1])) {
    alert("please pick a start and end point within the board");
    return maze;
  }

  while (queue.length) {
    let current = queue.shift();
    const {
      parent,
      pos: [x, y],
      dist,
    } = current;

    if (x == endNode.pos[0] && y == endNode.pos[1]) {
      let node = new Node(parent, [x, y], dist);
      let path = [];
      while (node) {
        path.push(node.pos);
        node = node.parent;
      }
      for (let node of queue) {
        maze[node.pos[0]][node.pos[1]] = "x";
      }
      for (let node of path) {
        maze[node[0]][node[1]] = "O";
      }
      return maze;
    }

    for (let [moveX, moveY] of directs) {
      const nextX = x + moveX;
      const nextY = y + moveY;

      if (isValidPos(nextX, nextY) && maze[nextX][nextY] === 0) {
        let new_node = new Node(current, [nextX, nextY], dist + 1);
        queue.push(new_node);
        maze[nextX][nextY] = "x";
      }
    }
  }

  return -1;
}

// module.exports = BFS
