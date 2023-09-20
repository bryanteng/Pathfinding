import Node from "../classes/Node";
// uniformCostSearch
export default function uniformCostSearch(grid: Node[][], start: Node, end: Node) {
    const openList = new PriorityQueue<Node>();
    const visitedNodes = new Set<Node>();
    const costMap = new Map<Node, number>();

    openList.enqueue(start, 0);
    costMap.set(start, 0);

    while (!openList.isEmpty()) {
        const currentNode = openList.dequeue()!;
        visitedNodes.add(currentNode);

        if (currentNode.x === end.x && currentNode.y === end.y) {
            const path: Node[] = [];
            let current: Node | undefined = currentNode;
            while (current) {
                if (!(current.x === start.x && current.y === start.y) && !(end.x === current.x && end.y === current.y)) {
                    path.unshift(current);
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

            const tentativeCost = costMap.get(currentNode)! + 1; // Assuming uniform cost

            if (!costMap.has(neighbor) || tentativeCost < costMap.get(neighbor)!) {
                costMap.set(neighbor, tentativeCost);
                neighbor.parent = currentNode;
                openList.enqueue(neighbor, tentativeCost);
            }
        }
    }

    return undefined; // No path found
}

// Priority Queue implementation (you can use an existing library or implement your own)
class PriorityQueue<T> {
    elements: { element: T; priority: number }[] = [];

    enqueue(element: T, priority: number) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): T | undefined {
        return this.elements.shift()?.element;
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

// Helper function to get valid neighbors
function getNeighbors(grid: Node[][], node: Node): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node;
    const directions = [
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 },  // Down
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 },  // Right
        { dx: -1, dy: -1 }, // Up-Left
        { dx: -1, dy: 1 },  // Down-Left
        { dx: 1, dy: -1 },  // Up-Right
        { dx: 1, dy: 1 }    // Down-Right
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
function isValidNeighbor(x: number, y: number, grid: Node[][]): boolean {
    return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}
