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

const color = "#00FCC0"
const colorStep = "#000101" // for non-inverted, color should be divisble by step * 4

let inverted = false;

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

    tempCtx = new OffscreenCanvas(w, h).getContext("2d")

    let textCanvas = new OffscreenCanvas(w, h);
    this.textCtx = textCanvas.getContext("2d");
    this.textCtx.font = getFontSize("00:00", .1);
    this.textCtx.textAlign = "center";
    this.textCtx.textBaseline = "middle";
    this.textCtx.fillStyle = "red";
    console.log(this.textCtx.font);

    let crossCanvas = new OffscreenCanvas(w, h);
    this.crossCtx = crossCanvas.getContext("2d");

    let fadeCanvas = new OffscreenCanvas(w, h);
    this.fadeCtx = fadeCanvas.getContext("2d"); //to handle fade for crossCanvas

    this.head = new Point();
    this.tail = new Point();
    
    // this.a = MathHelp.randInt(5, 30);
    // this.b = MathHelp.randInt(5, 30);
    // if (this.b > this.a) { //swap
    //   this.a = this.b ^ this.a;
    //   this.b = this.b ^ this.a;
    //   this.a = this.b ^ this.a;
    // } 
    this.a = 22;
    this.b = 21;
    console.log(this.a, this.b)
    this.playAnimation()
    this.count = 0;

    inverted = options.inverted == true;
    if (!inverted) {
      let trailCanvas = new OffscreenCanvas(w, h);
      this.trailCtx = trailCanvas.getContext("2d");
    }

    //for debug
    canvas.addEventListener("click", e => {
      logPixel(this.ctx, e.clientX, e.clientY)
    })
  }

  playAnimation() {
    this.beginning = true;

    requestAnimationFrame(t => this.animate(t));
  }

  animate(t) {
    let { a, b, w, h, ctx, textCtx, crossCtx, fadeCtx } = this

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

    
    fadeCtx.globalCompositeOperation = "source-over"
    fadeCtx.drawImage(crossCtx.canvas, 0, 0);

    diffTwice(fadeCtx, colorStep); //I think this operation needs to happen on the combo of fadeCtx and trailCtx?
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(fadeCtx.canvas, 0, 0);

    if (!inverted) {
      this.trailCtx.imageSmoothingEnabled = false;
      this.trailCtx.globalCompositeOperation = "source-over";
      this.drawHeadTailLine(this.trailCtx);

      diffTwice(this.trailCtx, colorStep);
      diffTwice(this.trailCtx, colorStep);
      diffTwice(this.trailCtx, colorStep);

      ctx.globalCompositeOperation = "lighten";
      ctx.drawImage(this.trailCtx.canvas, 0, 0);
    }

    
    
    requestAnimationFrame(t => this.animate(t));
  }

  drawHeadTailLine(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 100;
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.moveTo(this.head.x, this.head.y)
    ctx.lineTo(this.tail.x, this.tail.y)
    ctx.stroke();
  }
}

let tempCtx;
// Diffs subColor from ctx's canvas twice.
// Where color is 0, it stays 0 (difference operation takes absolute value) 
function diffTwice(ctx, subColor) {
  let w = ctx.canvas.width;
  let h = ctx.canvas.height;
  tempCtx.clearRect(0, 0, w, h)
  tempCtx.globalCompositeOperation = "source-over";
  tempCtx.fillStyle = subColor;
  tempCtx.drawImage(ctx.canvas, 0, 0);
  tempCtx.globalCompositeOperation = "source-in";
  tempCtx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalCompositeOperation = "difference";  
  ctx.drawImage(tempCtx.canvas, 0, 0);
  ctx.drawImage(tempCtx.canvas, 0, 0);
  ctx.restore();
}

//unused
function fade(ctx, amount) {
  let w = ctx.canvas.width;
  let h = ctx.canvas.height;
  let imageData = ctx.getImageData(0, 0, w, h)
  let arr = imageData.data;
  for (let i = 3; i < arr.length; i+=4) {
    if (arr[i] == 0) continue;
    else if (arr[i] > amount) arr[i] -= amount;
    else arr[i] = 0;
  }
  ctx.putImageData(imageData, 0, 0);
}

function getCurrentTimeString() {
  let now = new Date();
  let hh = now.getHours().toString().padStart(2, '0');
  let mm = now.getMinutes().toString().padStart(2, '0')
  // mm = now.getSeconds().toString().padStart(2, '0')
  // hh = now.getSeconds().toString().padStart(2, '0')
  return `${hh}:${mm}`;
}

function logPixel(ctx, x, y) {
  let arr = ctx.getImageData(x, y, 1, 1).data;
  console.log(arr);
}

function getFontSize(text, margin) {
  if (margin < 1) margin = tempCtx.canvas.width * margin;
  const margin2 = margin*2;
  let size = 1000;
  let tm;
  do {
    tempCtx.font = (size--) + "px monospace";
    tm = tempCtx.measureText(text);
  } while (tm.width > tempCtx.canvas.width - margin2)

  return tempCtx.font;
}

if (process.browser) window.LissajousAnimator = LissajousAnimator;
