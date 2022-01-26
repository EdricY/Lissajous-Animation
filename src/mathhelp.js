export default class MathHelp {
  static get TAU() {
    return 2 * Math.PI;
  }

  static lerp(a, b, frac) {
    return a * frac + b * (1 - frac);
  }

  static randFloat(a, b) {
    let rng = b - a;
    return Math.random() * rng + a;
  }

  static randInt(a, b) {
    let rng = b - a;
    return Math.floor(Math.random() * rng) + a;
  }

  static getTenthsDigit(x) {
    return (x.toFixed(1) * 10) % 10;
  }
}
