class Node {
  constructor(parent = undefined, pos = undefined, dist=0) {
    this.parent = parent;
    this.pos = pos;
    this.f = 0
    this.g = 0
    this.h = 0
    this.dist = dist
  }
}

export default Node