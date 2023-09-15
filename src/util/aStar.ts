import Node from "../classes/Node";

export default function aStar(grid: Node[][], start: Node, end: Node) {
  const openList = [start];
  const closedList = [];

  while (openList.length > 0) {
    openList.sort((a, b) => a.getF() - b.getF());
    const currentNode = openList.shift();
    currentNode.visited = true

    if (currentNode.x == end.x && currentNode.y == end.y) {
      const path = [];
      let current = currentNode;
      console.log("aStar maze", grid)
      while (current) {
        if( !(current.x === start.x && current.y === start.y) && !(end.x === current.x && end.y === current.y) ) path.unshift({ x: current.x, y: current.y });
        current = current.parent;
      }
      return [path, grid];
    }

    closedList.push(currentNode);

    const neighbors = [
      { x: currentNode.x, y: currentNode.y - 1 },
      { x: currentNode.x, y: currentNode.y + 1 },
      { x: currentNode.x - 1, y: currentNode.y },
      { x: currentNode.x + 1, y: currentNode.y },
      { x: currentNode.x - 1, y: currentNode.y - 1 },
      { x: currentNode.x - 1, y: currentNode.y + 1 },
      { x: currentNode.x + 1, y: currentNode.y - 1 },
      { x: currentNode.x + 1, y: currentNode.y + 1 },

    ];

    for (const neighbor of neighbors) {
      if (neighbor.x < 0 || neighbor.x >= grid[0].length || neighbor.y < 0 || neighbor.y >= grid.length) {
        continue;
      }

      if (grid[neighbor.y][neighbor.x].visited) {
        continue;
      }

      const newNode = grid[neighbor.y][neighbor.x]
      if(newNode && newNode.value === "W") continue;
      newNode.parent = currentNode
      newNode.g = currentNode.g + 1
      newNode.visited = true
      newNode.calculateHeuristic(end.x, end.y);

      if (closedList.some(node => node.x === newNode.x && node.y === newNode.y)) {
        continue;
      }

      const existingOpenNode = openList.find(node => node.x === newNode.x && node.y === newNode.y);
      if (existingOpenNode) {
        if (newNode.g < existingOpenNode.g) {
          existingOpenNode.parent = currentNode;
          existingOpenNode.g = newNode.g;
        }
      } else {
        openList.push(newNode);
      }
    }
  }

  return undefined;
}