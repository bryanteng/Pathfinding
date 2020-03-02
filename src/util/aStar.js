const Node = require('../classes/Node.js').default

function aStar(maze, start, end){
  let startNode = new Node(undefined, start)
  let endNode = new Node(undefined, end)
  let open_list = []
  let closed_list = []

  open_list.push(startNode)

  while(open_list.length > 0){
    let currentNode = open_list[0]
    let currentIndex = 0

    open_list.forEach(function (value, i) {
      // console.table(value);
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
          // console.log(node);
          maze[node.pos[0]][node.pos[1]] = "x"
        }
        for(let node of path){
          // console.log(node);
          maze[node[0]][node[1]] = "O"
        }
        console.table(maze);
        return maze
      return path.reverse()
    }

    let children = []

    let direction = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    for(let dir of direction){
      let node_position = [currentNode.pos[0] + dir[0], currentNode.pos[1] + dir[1]]
      if(node_position[0] > maze.length - 1 || node_position[0] < 0 || node_position[1] > maze[maze.length-1].length - 1 || node_position[1] < 0) continue
      if(maze[node_position[0]][node_position[1]] != 0) continue

      let new_node = new Node(currentNode, node_position)
      children.push(new_node)
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
    //
    // board[startNode.pos[0]][startNode.pos[1]] = "o"
    // board[currentNode.pos[0]][currentNode.pos[0]] = "^"
    // board[endNode.pos[0]][endNode.pos[0]] = "O"

    // console.log(startG,startH,startF,startX,endY)
    // console.log(open_list)
  }
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
