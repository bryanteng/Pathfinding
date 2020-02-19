class Node {
  constructor(self, parent = undefined, pos = undefined) {
    this.parent = parent;
    this.pos = pos;
    this.f = 0
    this.g = 0
    this.h = 0
  }
}

let n = new Node()
console.log(n,"node")
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

let startG = startX - currentX + startY - currentY
let startH = (endX - currentX)**2 + (endY - currentY)**2
let startF = startG+startH

console.log(board)
for(let i = 0; i<2;i++){
  currentX += i
  currentY += i

  board[startX][startY] = "o"
  board[currentX][currentY] = "^"
  board[endX][endY] = "O"

  console.log(startG,startH,startF,startX,endY)
  console.log(board)
}
