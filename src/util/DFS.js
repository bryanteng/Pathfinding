const Node = require('../classes/Node.js').default

export default function DFS(maze, start, end) {
    let startNode = new Node(undefined, start)
    let endNode = new Node(undefined, end)

    const stack = [startNode];
    maze[startNode.pos[0]][startNode.pos[1]] = 'x'

    const directs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    const N = maze.length;
    const M = maze[0].length;
    const isValidPos = (x, y) => x >= 0 && x < N && y >= 0 && y < M;
    if(!isValidPos(start[0],start[1]) || !isValidPos(end[0],end[1])){
      alert("please pick a start and end point within the board")
      return maze
    }

    while(stack.length > 0){
        let currentNode = stack.pop()

      if (currentNode.pos[0] == endNode.pos[0] && currentNode.pos[1] == endNode.pos[1]) {
        let path = []
        let current = currentNode
        while (current) {
          path.push(current.pos)
          current = current.parent
        }
        for (let node of path) {
          maze[node[0]][node[1]] = "O"
        }
        return maze
        // return path.reverse()
      }

        for (let [moveX, moveY] of directs) {
          const nextX = currentNode.pos[0] + moveX;
          const nextY = currentNode.pos[1] + moveY;
          if (isValidPos(nextX, nextY) && maze[nextX][nextY] == false) {
            let new_node = new Node(currentNode, [nextX, nextY])
            stack.push(new_node)
            maze[nextX][nextY] = 'x'

          }
        }
    }

    return -1;
};
