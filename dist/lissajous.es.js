module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LissajousAnimator; });\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/point.js\");\n/* harmony import */ var _mathhelp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mathhelp */ \"./src/mathhelp.js\");\n\r\n\r\n\r\nif (!window.OffscreenCanvas) {\r\n  window.OffscreenCanvas = class OffscreenCanvas {\r\n    constructor(width, height) {\r\n      let canvas = document.createElement(\"canvas\");\r\n      canvas.width = width;\r\n      canvas.height = height;\r\n      return canvas;\r\n    }\r\n  };\r\n}\r\n\r\nlet tickDur = 16;\r\nlet lastTick = 0;\r\n\r\nclass LissajousAnimator {\r\n  constructor(canvas, options) {\r\n    this.canvas = canvas.transferControlToOffscreen();\r\n    this.canvas.width = canvas.clientWidth;\r\n    this.canvas.height = canvas.clientHeight;\r\n    this.ctx = this.canvas.getContext(\"2d\");\r\n    this.textCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);\r\n    this.textCtx = this.textCanvas.getContext(\"2d\");\r\n    this.textCtx.font = \"500px monospace\"//Math.round(this.canvas.height/2) + \"px monospace\";\r\n    console.log(this.textCtx.font)\r\n    this.textCtx.textAlign = \"center\";\r\n    this.textCtx.textBaseline = \"middle\";\r\n    this.textCtx.fillStyle = \"red\";\r\n\r\n    this.crossCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);\r\n    this.crossCtx = this.crossCanvas.getContext(\"2d\");\r\n\r\n    this.maskCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);\r\n    this.maskCtx = this.maskCanvas.getContext(\"2d\");\r\n\r\n    this.head = new _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.tail = new _point__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.a = 22//MathHelp.randInt(5, 30);\r\n    this.b = 21//MathHelp.randInt(5, 30);\r\n    this.playAnimation()\r\n    this.count = 0;\r\n  }\r\n\r\n  playAnimation() {\r\n    let t = performance.now();\r\n    let w = this.canvas.width;\r\n    let h = this.canvas.height;\r\n\r\n    this.head.x = (w/2) + (w/2.3)*Math.sin(this.b*t/10000);\r\n    this.head.y = (h/2) + (h/2.3)*Math.cos(this.a*t/10000);\r\n    this.tail.x = this.head.x;\r\n    this.tail.y = this.head.y;\r\n\r\n    requestAnimationFrame(t => this.animate(t));\r\n  }\r\n\r\n  animate(t) {\r\n    if (t - lastTick < tickDur) {\r\n      requestAnimationFrame(t => this.animate(t));\r\n      return;\r\n    }\r\n    this.count++;\r\n\r\n    lastTick = t;\r\n    let w = this.canvas.width;\r\n    let h = this.canvas.height;\r\n    let { a, b, head, tail, ctx, textCtx, crossCtx, maskCtx } = this\r\n    tail.x = head.x;\r\n    tail.y = head.y;\r\n    head.x = (w/2) + (w/2.3)*Math.sin(b*t/5000);\r\n    head.y = (h/2) + (h/2.3)*Math.cos(a*t/5000);\r\n\r\n    ctx.fillStyle = 'rgba(0,0,0,.2)';\r\n    ctx.fillRect(0, 0, w, h);\r\n    \r\n    \r\n    textCtx.clearRect(0, 0, w, h);\r\n    textCtx.fillText(getCurrentTimeString(), w/2, h/2);\r\n\r\n    crossCtx.globalCompositeOperation = \"source-over\";\r\n    this.drawHeadTailLine(crossCtx);\r\n    crossCtx.globalCompositeOperation = \"destination-in\";\r\n    crossCtx.drawImage(this.textCanvas, 0, 0);\r\n\r\n    maskCtx.globalCompositeOperation = \"source-over\";\r\n    maskCtx.fillStyle = '#000100';\r\n    maskCtx.fillRect(0, 0, w, h);\r\n    maskCtx.globalCompositeOperation = \"destination-in\";\r\n    maskCtx.drawImage(this.crossCanvas, 0, 0);\r\n\r\n    crossCtx.globalCompositeOperation = \"difference\";\r\n    crossCtx.drawImage(this.maskCanvas, 0, 0);\r\n    \r\n    this.ctx.drawImage(this.crossCanvas, 0, 0);\r\n    this.drawHeadTailLine(ctx);\r\n\r\n\r\n    requestAnimationFrame(t => this.animate(t));\r\n  }\r\n\r\n  drawHeadTailLine(ctx) {\r\n    ctx.beginPath();\r\n    ctx.strokeStyle = '#0F0';\r\n    ctx.lineWidth = 100;\r\n    ctx.lineJoin = \"round\"\r\n    ctx.lineCap = \"round\"\r\n    ctx.moveTo(this.head.x, this.head.y)\r\n    ctx.lineTo(this.tail.x, this.tail.y)\r\n    ctx.stroke();\r\n  }\r\n}\r\n\r\nfunction getCurrentTimeString() {\r\n  let now = new Date();\r\n  let hh = now.getHours().toString().padStart(2, '0');\r\n  let mm = now.getMinutes().toString().padStart(2, '0')\r\n  return `${hh}:${mm}`;\r\n}\r\n\r\nif (process.browser) window.LissajousAnimator = LissajousAnimator;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/mathhelp.js":
/*!*************************!*\
  !*** ./src/mathhelp.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MathHelp; });\n\r\nclass MathHelp {\r\n  static get TAU() {\r\n    return 2 * Math.PI;\r\n  }\r\n\r\n  static lerp(a, b, frac) {\r\n    return (a * frac) + (b * (1-frac))\r\n  }\r\n\r\n  static randFloat(a, b) {\r\n    let rng = b-a;\r\n    return (Math.random() * rng) + a\r\n  }\r\n\r\n  static randInt(a, b) {\r\n    let rng = b-a;\r\n    return Math.floor(Math.random() * rng) + a\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/mathhelp.js?");

/***/ }),

/***/ "./src/point.js":
/*!**********************!*\
  !*** ./src/point.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Point; });\n/* harmony import */ var _mathhelp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mathhelp */ \"./src/mathhelp.js\");\n\r\nclass Point {\r\n  constructor(x, y) {\r\n    if (x == null) x = 0;\r\n    if (y == null) y = 0;\r\n    this.vals = [x, y];\r\n  }\r\n  \r\n  get x() { return this.vals[0]; }\r\n  set x(val) { this.vals[0] = val }\r\n  get y() { return this.vals[1]; }\r\n  set y(val) { this.vals[1] = val }\r\n\r\n  static midpoint(p1, p2, frac=.5) {\r\n    let x = _mathhelp__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lerp(p1.x, p2.x, frac);\r\n    let y = _mathhelp__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lerp(p1.y, p2.y, frac);\r\n    return new Point(x, y);\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/point.js?");

/***/ })

/******/ })["default"];