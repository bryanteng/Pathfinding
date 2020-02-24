class Node {
  constructor(parent = undefined, pos = undefined) {
    this.parent = parent;
    this.pos = pos;
    this.f = 0
    this.g = 0
    this.h = 0
  }
}

function aStar(maze, start, end){
  let startNode = new Node(undefined, start)
  startNode.f = 0
  startNode.g = 0
  startNode.h = 0
  // startNode.g = startX - currentX + startY - currentY
  // startNode.g = (endX - currentX)**2 + (endY - currentY)**2
  // startNode.g = startG+startH
  let endNode = new Node(undefined, end)

  let open_list = []
  let closed_list = []

  open_list.push(startNode)
  console.log(open_list)
  let currentNode = startNode
  //
  // console.log(board)
  while(open_list.length > 0){

    current_node = open_list[0]
    current_index = 0

    open_list.forEach(function (value, i) {
      if(value.f < currentNode.f){
        currentNode = value
        current_index = i
      }
    });
    open_list.pop(current_index)
    closed_list.push(current_node)

    if(current_node == endNode){
      let path = []
      let current = current_node
      while(current){
          path.push(current.pos)
          current = current.parent
        }
      return path.reverse()
    }

    let children = []

    direction = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    for(dir of direction){
      node_position = [current_node.pos[0] + dir[0], current_node.pos[1] + dir[1]]

      if(node_position[0] > maze.length - 1 || node_position[0] < 0 || node_position[1] > maze[maze.length-1].length - 1 || node_position[1] < 0) continue

      if(maze[node_position[0]][node_position[1]] != 0) continue

      new_node = new Node(current_node, node_position)

      children.push(new_node)
    }

    for(child of children){

      for(closed_child of closed_list)
          if(child == closed_child) continue

      child.g = current_node.g + 1
      child.h = ((child.pos[0] - endNode.pos[0]) ** 2) + ((child.pos[1] - endNode.pos[1]) ** 2)
      child.f = child.g + child.h

      for(open_node of open_list){
          if(child == open_node && child.g > open_node.g) continue
      }
      open_list.push(child)
    }

    board[startNode.pos[0]][startNode.pos[1]] = "o"
    board[currentNode.pos[0]][currentNode.pos[0]] = "^"
    board[endNode.pos[0]][endNode.pos[0]] = "O"

    // console.log(startG,startH,startF,startX,endY)
    console.log(board)
  }
}
//create nested array
let x = 10
let y = 10

let yArr = "0".repeat(y).split('').map(x=>+x)
let arr = Array.from({length:x}).map(x=>yArr.slice())
let board = arr.slice()

//start pointx
let startX = 1
let startY = 1
let parent = [startX,startY]

//current point
let currentX = startX
let currentY = startY
let current = [startX, startY]

//end point
let endX = 8
let endY = 8
let end = [endX, endY]
aStar(board, parent, end)
