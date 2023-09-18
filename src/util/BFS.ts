import Node from "../classes/Node";

export default function BFS(grid: Node[][], start, end) {
  const queue: Node[] = [start];
  const visitedNodes = new Set();
  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 0, dy: 1 }, // Down
    { dx: -1, dy: 0 }, // Left
    { dx: 1, dy: 0 }, // Right
    { dx: -1, dy: -1 }, // Up-Left
    { dx: -1, dy: 1 }, // Down-Left
    { dx: 1, dy: -1 }, // Up-Right
    { dx: 1, dy: 1 } // Down-Right
  ];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visitedNodes.add(currentNode);

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

    for (const dir of directions) {
      const neighborX = currentNode.x + dir.dx;
      const neighborY = currentNode.y + dir.dy;

      if (
        neighborX < 0 ||
        neighborX >= grid[0].length ||
        neighborY < 0 ||
        neighborY >= grid.length ||
        visitedNodes.has(grid[neighborY][neighborX]) ||
        grid[neighborY][neighborX].value === "W"
      ) {
        continue;
      }

      const newNode = grid[neighborY][neighborX];
      newNode.parent = currentNode;
      queue.push(newNode);
    }
  }

  return undefined; // No path found
}
