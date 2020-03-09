const Node = require('../classes/Node.js').default

var BFS = function (maze) {
    //start pointx
    let startX = 0
    let startY = 0
    let start = new Node(undefined, [startX, startY], 0)
    //end point
    let endX = 5
    let endY = 5
    let end = new Node(undefined, [endX, endY])
    const queue = [start];
    const directs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    const N = maze.length;
    const M = maze[0].length;
    const isValidPos = (x, y) => x >= 0 && x < N && y >= 0 && y < M;
    while (queue.length) {
        let current = queue.shift();
        const { parent, pos: [x, y], dist } = current

        if (x == end.pos[0] && y == end.pos[1]) {
            let node = new Node(parent, [x, y], dist)
            let path = []
            while (node) {
                console.log(node.pos)
                path.push(node.pos)
                node = node.parent
            }
            for(let node of queue){
              maze[node.pos[0]][node.pos[1]] = "x"
            }
            for(let node of path){
              maze[node[0]][node[1]] = "O"
            }
            return maze
            return dist;
        }

        for (let [moveX, moveY] of directs) {
            const nextX = x + moveX;
            const nextY = y + moveY;

            if (isValidPos(nextX, nextY) && maze[nextX][nextY] === 0) {
                let new_node = new Node(current, [nextX, nextY], dist + 1)
                queue.push(new_node);
                maze[nextX][nextY] = 1;
            }
        }
    }

    return -1;
};

module.exports = BFS
