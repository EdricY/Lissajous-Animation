import Point from "./point";
import MathHelp from "./mathhelp";

// delete window.OffscreenCanvas;

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

let inverted = true;

let tickDur = 16;
let lastTick = 0;
export default class LissajousAnimator {
  constructor(canvas, options) {
    let osCanvas = canvas.transferControlToOffscreen();
    this.w = canvas.clientWidth
    this.h = canvas.clientHeight;
    let { w, h } = this;
    osCanvas.width = canvas.clientWidth;
    osCanvas.height = canvas.clientHeight;
    canvas.style.backgroundColor = "#000";

    this.ctx = osCanvas.getContext("2d");
    let textCanvas = new OffscreenCanvas(w, h);
    this.textCtx = textCanvas.getContext("2d");
    this.textCtx.font = "500px monospace"//Math.round(h/2) + "px monospace";
    this.textCtx.textAlign = "center";
    this.textCtx.textBaseline = "middle";
    this.textCtx.fillStyle = "red";
    console.log(this.textCtx.font)

    let crossCanvas = new OffscreenCanvas(w, h);
    this.crossCtx = crossCanvas.getContext("2d");

    let maskCanvas = new OffscreenCanvas(w, h);
    this.maskCtx = maskCanvas.getContext("2d");

    this.head = new Point();
    this.tail = new Point();
    
    this.a = 22//MathHelp.randInt(5, 30);
    this.b = 21//MathHelp.randInt(5, 30);
    this.playAnimation()
    this.count = 0;

    //for debug
    canvas.addEventListener("click", e => {
      logPixel(this.ctx, e.clientX, e.clientY)
    })

    inverted = options.inverted == true;
  }

  playAnimation() {
    let t = performance.now();
    let { w, h } = this;
    this.beginning = true;

    requestAnimationFrame(t => this.animate(t));
  }

  animate(t) {
    let { a, b, w, h, ctx, textCtx, crossCtx, maskCtx } = this

    if (this.beginning) {
      this.head.x = (w/2) + (w/2.3)*Math.sin(b*t/5000);
      this.head.y = (h/2) + (h/2.3)*Math.cos(a*t/5000);
      this.tail.x = this.head.x;
      this.tail.y = this.head.y;
      this.beginning = false;
      requestAnimationFrame(t => this.animate(t));
      return;
    }

    if (t - lastTick < tickDur || this.beginning) {
      requestAnimationFrame(t => this.animate(t));
      return;
    }
    this.count++;

    lastTick = t;
    // window.ctx = ctx;
    this.tail.x = this.head.x;
    this.tail.y = this.head.y;
    this.head.x = (w/2) + (w/2.3)*Math.sin(b*t/5000);
    this.head.y = (h/2) + (h/2.3)*Math.cos(a*t/5000);
    
    textCtx.clearRect(0, 0, w, h);
    textCtx.globalCompositeOperation = "source-over";
    if (inverted) {
      textCtx.fillStyle = "white";
      textCtx.fillRect(0, 0, w, h)
      textCtx.globalCompositeOperation = "destination-out";
    }
    textCtx.fillText(getCurrentTimeString(), w/2, h/2);

    crossCtx.clearRect(0, 0, w, h)
    crossCtx.globalCompositeOperation = "source-over";
    this.drawHeadTailLine(crossCtx);
    crossCtx.globalCompositeOperation = "destination-in";
    crossCtx.drawImage(textCtx.canvas, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    this.ctx.drawImage(crossCtx.canvas, 0, 0);

    subtract(ctx, "#000001", maskCtx);

    ctx.globalCompositeOperation = "source-over";
    
    if (!inverted) {
      //TODO: find better way to draw trail
      ctx.globalAlpha = .1;
      this.drawHeadTailLine(ctx);
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(t => this.animate(t));
  }

  drawHeadTailLine(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = '#00F';
    ctx.lineWidth = 100;
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.moveTo(this.head.x, this.head.y)
    ctx.lineTo(this.tail.x, this.tail.y)
    ctx.stroke();
  }
}

function subtract(ctx, subColor, tempCtx) {
  let w = ctx.canvas.width;
  let h = ctx.canvas.height;
  if (!tempCtx) {
    let tempCanvas = new OffscreenCanvas(w, h);
    tempCtx = tempCanvas.getContext("2d");
  }
  tempCtx.globalCompositeOperation = "source-over";
  tempCtx.fillStyle = subColor;
  tempCtx.fillRect(0, 0, w, h);
  tempCtx.globalCompositeOperation = "destination-in";
  tempCtx.drawImage(ctx.canvas, 0, 0);
  tempCtx.globalCompositeOperation = "difference";
  tempCtx.drawImage(ctx.canvas, 0, 0);

  ctx.globalCompositeOperation = "copy";
  ctx.drawImage(tempCtx.canvas, 0, 0);
}

function getCurrentTimeString() {
  let now = new Date();
  let hh = now.getHours().toString().padStart(2, '0');
  let mm = now.getMinutes().toString().padStart(2, '0')
  // mm = now.getSeconds().toString().padStart(2, '0')
  return `${hh}:${mm}`;
}

function logPixel(ctx, x, y) {
  let arr = ctx.getImageData(x, y, 1, 1).data;
  console.log(arr);
}

if (process.browser) window.LissajousAnimator = LissajousAnimator;
