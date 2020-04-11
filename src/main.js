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

    this.maskCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.maskCtx = this.maskCanvas.getContext("2d");

    this.head = new Point();
    this.tail = new Point();
    this.a = 22//MathHelp.randInt(5, 30);
    this.b = 21//MathHelp.randInt(5, 30);
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
    let { a, b, head, tail, ctx, textCtx, crossCtx, maskCtx } = this
    window.ctx = ctx;
    tail.x = head.x;
    tail.y = head.y;
    head.x = (w/2) + (w/2.3)*Math.sin(b*t/5000);
    head.y = (h/2) + (h/2.3)*Math.cos(a*t/5000);

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0, 0, w, h);
    
    textCtx.clearRect(0, 0, w, h);
    textCtx.fillText(getCurrentTimeString(), w/2, h/2);

    crossCtx.globalCompositeOperation = "source-over";
    this.drawHeadTailLine(crossCtx);
    crossCtx.globalCompositeOperation = "destination-in";
    crossCtx.drawImage(this.textCanvas, 0, 0);

    maskCtx.globalCompositeOperation = "source-over";
    maskCtx.fillStyle = '#000100';
    maskCtx.fillRect(0, 0, w, h);
    maskCtx.globalCompositeOperation = "destination-in";
    maskCtx.drawImage(this.crossCanvas, 0, 0);
    maskCtx.globalCompositeOperation = "difference";
    maskCtx.drawImage(this.crossCanvas, 0, 0);

    crossCtx.globalCompositeOperation = "copy";
    crossCtx.drawImage(this.maskCanvas, 0, 0)
    
    this.ctx.drawImage(this.crossCanvas, 0, 0);


    maskCtx.globalCompositeOperation = "source-over";
    maskCtx.fillStyle = '#000100';
    maskCtx.fillRect(0, 0, w, h);
    maskCtx.globalCompositeOperation = "destination-in";
    maskCtx.drawImage(this.canvas, 0, 0);
    maskCtx.globalCompositeOperation = "difference";
    maskCtx.drawImage(this.canvas, 0, 0);
    
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(this.maskCanvas, 0, 0);
    
    ctx.globalCompositeOperation = "source-over";
    this.drawHeadTailLine(ctx);

    requestAnimationFrame(t => this.animate(t));
  }

  drawHeadTailLine(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = '#0F0';
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
  let mm = now.getMinutes().toString().padStart(2, '0')
  return `${hh}:${mm}`;
}

if (process.browser) window.LissajousAnimator = LissajousAnimator;
