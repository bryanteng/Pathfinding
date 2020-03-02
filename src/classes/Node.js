class Node {
  constructor(parent = undefined, pos = undefined) {
    this.parent = parent;
    this.pos = pos;
    this.f = 0
    this.g = 0
    this.h = 0
  }
}

export default Node
