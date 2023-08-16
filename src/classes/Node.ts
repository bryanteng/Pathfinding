class Node {
  public _f: number = 0;
  _parent: Node = undefined;
  pos: string;
  g?: number;
  h?: number;
  dist?: number;
  visited?: boolean;
  _value: string | number = 0;
  x: number;
  y: number;

  constructor(
    pos: string,
    _value: string | number,
    visited: boolean = false,
    parent?: Node,
    dist?: number
  ) {
    this.pos = pos;
    this.g = 0;
    this.h = 0;
    this.dist = dist;
    this.visited = visited;
    this._value = _value;
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

  get f(): number {
    return this._f;
  }

  set f(f: number) {
    this._f = f;
  }

  setG = (g: number): void => {
    this.g = g;
  };

  setH = (h: number): void => {
    this.h = h;
  };

  setF = (f: number): void => {
    this.f = f;
  };
}

export default Node;
