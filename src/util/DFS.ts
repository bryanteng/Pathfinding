import Node from "../classes/Node";

export default function DFS(
  grid: Node[][],
  start: Node,
  end: Node
) {
  const stack = [start];
  const visitedNodes = new Set();

  while (stack.length > 0) {
    const currentNode = stack.pop();

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

    visitedNodes.add(currentNode);

    const neighbors = [
      { x: currentNode.x, y: currentNode.y - 1 },
      { x: currentNode.x, y: currentNode.y + 1 },
      { x: currentNode.x - 1, y: currentNode.y },
      { x: currentNode.x + 1, y: currentNode.y },
      { x: currentNode.x - 1, y: currentNode.y - 1 },
      { x: currentNode.x - 1, y: currentNode.y + 1 },
      { x: currentNode.x + 1, y: currentNode.y - 1 },
      { x: currentNode.x + 1, y: currentNode.y + 1 }
    ];

    for (const neighbor of neighbors) {
      if (
        neighbor.x < 0 ||
        neighbor.x >= grid[0].length ||
        neighbor.y < 0 ||
        neighbor.y >= grid.length ||
        visitedNodes.has(grid[neighbor.y][neighbor.x]) ||
        grid[neighbor.y][neighbor.x].value === "W"
      ) {
        continue;
      }

      const newNode = grid[neighbor.y][neighbor.x];
      newNode.parent = currentNode;
      stack.push(newNode);
    }
  }

  return undefined; // No path found
}