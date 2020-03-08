const Node = require('../classes/Node.js').default

var BFS = function (grid) {
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
    const N = grid.length;
    const M = grid[0].length;
    const isValidPos = (x, y) => x >= 0 && x < N && y >= 0 && y < M;
    while (queue.length) {
        let current = queue.shift();
        const { parent, pos: [x, y], dist } = current

        if (x == end.pos[0] && y == end.pos[1]) {
            let node = new Node(parent, [x, y], dist)
            // console.log(queue,node)
            // console.log(parent)
            while (node) {
                console.log(node.pos)
                node = node.parent
            }
            return dist;
        }

        for (let [moveX, moveY] of directs) {
            const nextX = x + moveX;
            const nextY = y + moveY;

            if (isValidPos(nextX, nextY) && grid[nextX][nextY] === 0) {
                let new_node = new Node(current, [nextX, nextY], dist + 1)
                queue.push(new_node);
                grid[nextX][nextY] = 1;
            }
        }
    }

    return -1;
};