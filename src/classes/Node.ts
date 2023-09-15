class Node {
  _parent: Node = undefined;
  pos: string;
  g?: number;
  h?: number;
  f?: number = 0;
  dist?: number;
  _visited?: boolean;
  _value: string | number = 0;
  x: number;
  y: number;

  constructor(
    pos: string,
    value: string | number,
    visited: boolean = false,
    parent?: Node,
    dist?: number
  ) {
    this.pos = pos;
    this.g = parent ? parent.g + 1 : 0;
    this.h = 0;
    this.dist = dist;
    this._visited = visited;
    this._value = value;
    this._parent = parent;
    this.x = parseInt(this.pos.split(",")[1]);
    this.y = parseInt(this.pos.split(",")[0]);
  }

  get value(): string | number {
    return this._value
  }

  set value(value: string | number) {
    this._value = value
  }

  get parent(): Node {
    return this._parent;
  };

  set parent(parent: Node) {
    this._parent = parent;
  };

  get visited(): boolean {
    return this._visited
  }

  set visited(visited: boolean) {
    this._visited = visited
  }


  calculateHeuristic(targetX, targetY) {
    this.h = Math.abs(targetX - this.x) + Math.abs(targetY - this.y);
  }

  getF() {
    return this.g + this.h;
  }
}

export default Node;
