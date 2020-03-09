const Node = require('../classes/Node.js').default

function aStar(maze, start, end){
  let startNode = new Node(undefined, start)
  let endNode = new Node(undefined, end)
  let open_list = [startNode]
  let closed_list = []
  const N = maze.length;
  const M = maze[0].length;
  const isValidPos = (x, y) => x >= 0 && x < N && y >= 0 && y < M;

  while(open_list.length > 0){
    let currentNode = open_list[0]
    console.log(currentNode)
    let currentIndex = 0

    open_list.forEach(function (value, i) {
      if(value.f < currentNode.f){
        currentNode = value
        currentIndex = i
      }
    });
    open_list.pop(currentIndex)
    closed_list.push(currentNode)
    if(currentNode.pos[0] == endNode.pos[0] && currentNode.pos[1] == endNode.pos[1]){
      let path = []
      let current = currentNode
      while(current){
          path.push(current.pos)
          current = current.parent
        }
        for(let node of open_list){
          maze[node.pos[0]][node.pos[1]] = "x"
        }
        for(let node of path){
          maze[node[0]][node[1]] = "O"
        }
        return maze
      // return path.reverse()
    }

    let children = []

    let direction = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    for(let [moveX, moveY] of direction){
      const nextX = currentNode.pos[0] + moveX;
      const nextY = currentNode.pos[1] + moveY;
      if(isValidPos(nextX, nextY) && maze[nextX][nextY] == 0 ){
        let new_node = new Node(currentNode, [nextX, nextY])
        children.push(new_node)
      }
    }

    for(let child of children){
      for(let closed_child of closed_list)
          if(child == closed_child) continue
      child.g = currentNode.g + 1
      child.h = ((child.pos[0] - endNode.pos[0]) ** 2) + ((child.pos[1] - endNode.pos[1]) ** 2)
      child.f = child.g + child.h

      for(let open_node of open_list){
          if(child == open_node && child.g > open_node.g) continue
      }
      open_list.push(child)
    }
  }
  return -1
}
//create nested array
// let x = 10
// let y = 10
//
// let yArr = "0".repeat(y).split('').map(x=>+x)
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
module.exports = aStar
