import Node from "../classes/Node";

export default function GBFS(grid: Node[][], start, end) {
    const openList: Node[] = [start];
    const visitedNodes = new Set();

    while (openList.length > 0) {
        openList.sort((a, b) => heuristic(a, end) - heuristic(b, end)); // Sort by heuristic (closest to the goal)
        const currentNode = openList.shift();
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

        const neighbors = getNeighbors(grid, currentNode);

        for (const neighbor of neighbors) {
            if (visitedNodes.has(neighbor) || neighbor.value === "W") {
                continue;
            }

            neighbor.parent = currentNode;
            openList.push(neighbor);
        }
    }

    return undefined; // No path found
}

// Heuristic function (Euclidean distance)
function heuristic(node, end) {
    const dx = node.x - end.x;
    const dy = node.y - end.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Helper function to get valid neighbors
function getNeighbors(grid, node) {
    const neighbors = [];
    const { x, y } = node;
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

    for (const dir of directions) {
        const neighborX = x + dir.dx;
        const neighborY = y + dir.dy;

        if (isValidNeighbor(neighborX, neighborY, grid)) {
            neighbors.push(grid[neighborY][neighborX]);
        }
    }

    return neighbors;
}

// Helper function to check if a neighbor is valid
function isValidNeighbor(x, y, grid) {
    return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}
