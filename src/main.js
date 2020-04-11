import Point from "./point";
import MathHelp from "./mathhelp";

if (!window.OffscreenCanvas) {
  window.OffscreenCanvas = class OffscreenCanvas {
    constructor(width, height) {
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
  };
}

let tickDur = 16;
let lastTick = 0;

export default class LissajousAnimator {
  constructor(canvas, options) {
    this.canvas = canvas.transferControlToOffscreen();
    this.canvas.width = canvas.clientWidth;
    this.canvas.height = canvas.clientHeight;
    this.ctx = this.canvas.getContext("2d");

    this.textCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.textCtx = this.textCanvas.getContext("2d");
    this.textCtx.font = "500px monospace"//Math.round(this.canvas.height/2) + "px monospace";
    console.log(this.textCtx.font)
    this.textCtx.textAlign = "center";
    this.textCtx.textBaseline = "middle";
    this.textCtx.fillStyle = "red";

    this.crossCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.crossCtx = this.crossCanvas.getContext("2d");

    this.head = new Point();
    this.tail = new Point();
    this.a = MathHelp.randInt(5, 30);
    this.b = MathHelp.randInt(5, 30);
    console.log(this.a, this.b)
    this.playAnimation()
    this.count = 0;
  }

  playAnimation() {
    let t = performance.now();
    let w = this.canvas.width;
    let h = this.canvas.height;

    this.head.x = (w/2) + (w/2.3)*Math.sin(this.b*t/10000);
    this.head.y = (h/2) + (h/2.3)*Math.cos(this.a*t/10000);
    this.tail.x = this.head.x;
    this.tail.y = this.head.y;

    requestAnimationFrame(t => this.animate(t));
  }

  animate(t) {
    if (t - lastTick < tickDur) {
      requestAnimationFrame(t => this.animate(t));
      return;
    }
    this.count++;

    lastTick = t;
    let w = this.canvas.width;
    let h = this.canvas.height;
    this.tail.x = this.head.x;
    this.tail.y = this.head.y;
    this.head.x = (w/2) + (w/2.3)*Math.sin(this.b*t/10000);
    this.head.y = (h/2) + (h/2.3)*Math.cos(this.a*t/10000);

    this.ctx.fillStyle = 'rgba(0,0,0,.5)';
    this.ctx.fillRect(0, 0, w, h);
    
    this.drawHeadTailLine(this.ctx);
    
    this.textCtx.clearRect(0, 0, w, h);
    this.textCtx.fillText(getCurrentTimeString(), this.canvas.width/2, this.canvas.height/2);

    this.crossCtx.globalCompositeOperation = "source-atop";
    this.crossCtx.fillStyle = 'rgba(0,0,0,.3)';
    if (this.count % 3 == 0) this.crossCtx.fillRect(0, 0, w, h);
    this.crossCtx.globalCompositeOperation = "source-over";
    this.drawHeadTailLine(this.crossCtx);
    this.crossCtx.globalCompositeOperation = "destination-in";
    this.crossCtx.drawImage(this.textCanvas, 0, 0);

    this.ctx.drawImage(this.crossCanvas, 0, 0);


    requestAnimationFrame(t => this.animate(t));
  }

  drawHeadTailLine(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 100;
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.moveTo(this.head.x, this.head.y)
    ctx.lineTo(this.tail.x, this.tail.y)
    ctx.stroke();
  }
}

function getCurrentTimeString() {
  let now = new Date();
  let hh = now.getHours().toString().padStart(2, '0');
  let mm = now.getSeconds().toString().padStart(2, '0')
  return `${hh}:${mm}`;
}

if (process.browser) window.LissajousAnimator = LissajousAnimator;
