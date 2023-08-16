import Node from './Node'

class Queue {
  items: Node[];
  constructor(items: Node[] = []) {
    this.items = items;
  }

  enqueue(item: Node) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length == 0;
  }
}

export default Queue;
