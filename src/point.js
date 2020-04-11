import MathHelp from "./mathhelp";
export default class Point {
  constructor(x, y) {
    if (x == null) x = 0;
    if (y == null) y = 0;
    this.vals = [x, y];
  }
  
  get x() { return this.vals[0]; }
  set x(val) { this.vals[0] = val }
  get y() { return this.vals[1]; }
  set y(val) { this.vals[1] = val }

  static midpoint(p1, p2, frac=.5) {
    let x = MathHelp.lerp(p1.x, p2.x, frac);
    let y = MathHelp.lerp(p1.y, p2.y, frac);
    return new Point(x, y);
  }
}