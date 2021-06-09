// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4sONq":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "90497382253e84e77eefb438e2c23b48";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"4EXUw":[function(require,module,exports) {
var _appRenderAreaJs = require("../app/renderArea.js");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _appRenderAreaJsDefault = _parcelHelpers.interopDefault(_appRenderAreaJs);
let renderArea;
const ctx = document.getElementById("cvs").getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
window.onresize = function () {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  canvasSize = {
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight
  };
  console.log("onresize");
};
window.onload = function () {
  renderArea = new _appRenderAreaJsDefault.default({
    ctx
  });
  renderArea.initPolygons();
  renderArea.paint();
  document.onkeyup = renderArea.keyPressEvent;
  document.getElementById("cvs").onwheel = renderArea.wheelEvent;
  document.getElementById("cvs").onmousemove = renderArea.mouseMoveEvent;
  document.getElementById("cvs").onmouseup = renderArea.mouseReleaseEvent;
  document.getElementById("cvs").onmousedown = renderArea.mousePressEvent;
  document.getElementById("cvs").oncontextmenu = function () {
    return false;
  };
};

},{"../app/renderArea.js":"FlLgd","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"FlLgd":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _srcIndexJs = require('../src/index.js');
class RenderArea {
  constructor(options) {
    this.polygons = [];
    this.polygons_color = [];
    this.squareToCut;
    this.selectedPolygon = -1;
    this.showInfo = 0;
    this.showHelp = 1;
    this.scale = 1;
    this.offset_x = 0;
    this.offset_y = 0;
    this.ctx = options.ctx;
    this.mouseLeftPress = 0;
    this.mouse_x;
    this.mouse_y;
    this.mouse = new _srcIndexJs.Vector(0, 0, 0);
    this.pointSize = 10;
    this.pointOutlineSize = 3;
    this.selectedPoint = -1;
    this.ke = null;
    this.polygons_color.push("darkRed");
    this.polygons_color.push("green");
    this.polygons_color.push("darkGreen");
    this.polygons_color.push("blue");
    this.polygons_color.push("darkBlue");
    this.polygons_color.push("cyan");
    this.polygons_color.push("darkCyan");
    this.polygons_color.push("magenta");
    this.polygons_color.push("darkMagenta");
    this.polygons_color.push("darkYellow");
    this.polygons_color.push("gray");
    this.polygons_color.push("darkGray");
    this.canvasSize = {
      top: this.ctx.canvas.offsetTop,
      left: this.ctx.canvas.offsetLeft,
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height
    };
  }
  drawPoly = poly => {
    this.ctx.beginPath();
    var point = poly.get(0);
    this.ctx.moveTo(point.x, point.y);
    for (var i = 1, cnt = poly.size(); i < cnt; i++) {
      point = poly.get(i);
      this.ctx.lineTo(point.x, point.y);
    }
    this.ctx.closePath();
    // this.ctx.strokeStyle = "#000000";
    // this.ctx.lineWidth = 1;
    // this.ctx.fillStyle = "rgba(0,200,0,.4)";
    this.ctx.globalAlpha = 0.1;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
    this.ctx.stroke();
  };
  // findCutLine = function () {
  // };
  paintEvent = () => {
    this.ctx.clearRect(this.canvasSize.top, this.canvasSize.left, this.canvasSize.width, this.canvasSize.height);
    if (this.showHelp) {
      this.ctx.font = "13px '맑은 고딕'";
      this.ctx.fillStyle = "#000";
      var y = 0, dy = 13 + 1.0;
      this.ctx.fillText("Cut Area Square: " + Number(this.squareToCut), 10, y += dy);
      this.ctx.fillText("Current this.scale: " + Number(this.scale), 10, y += dy);
      this.ctx.fillText("Selected Polygon: " + this.selectedPolygon + " / " + this.polygons.length, 10, y += dy);
      this.ctx.fillText("Selected Vertex: " + this.selectedPoint, 10, y += dy);
      this.ctx.fillText("Q/W - increase/decrease cut area square to 100", 10, y += dy);
      this.ctx.fillText("q/w - increase/decrease cut area square to 10", 10, y += dy);
      this.ctx.fillText("a/s - switch between areas", 10, y += dy);
      this.ctx.fillText("r - to restore initial polygon", 10, y += dy);
      this.ctx.fillText("i - show/hide polygons square value", 10, y += dy);
      this.ctx.fillText("c - to cut area as black cut line shows", 10, y += dy);
      this.ctx.fillText("h - show/hide this text", 10, y += dy);
      this.ctx.fillText("Mouse wheel to adjust this.scale", 10, y += dy);
      this.ctx.fillText("Left mouse click and drag'n'drop on background to move all scene", 10, y += dy);
      this.ctx.fillText("Left mouse click and drag'n'drop on vertex to move vertices", 10, y += dy);
      this.ctx.fillText("Right mouse click to select nearest polygon", 10, y += dy);
      this.ctx.fillText("Middle mouse click to split edge of selected polygon", 10, y + dy);
    }
    this.ctx.save();
    this.ctx.translate(this.offset_x, this.offset_y);
    this.ctx.scale(this.scale, this.scale);
    for (var i = 0; i < this.polygons.length; i++) {
      var color = this.polygons_color[i % this.polygons_color.length];
      // if(i==this.selectedPolygon)color="red";
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = color;
      // this.ctx.fillStyle.opacity= 1;
      this.ctx.lineWidth = 1;
      this.drawPoly(this.polygons[i]);
      if (this.showInfo) {
        var p = this.polygons[i].countCenter();
        this.ctx.font = "normal 12px 'malgun gothic'";
        this.ctx.fillText(this.polygons[i].countSquare(), p.x, p.y);
      }
    }
    // debugger;
    var cut = new _srcIndexJs.Line();
    var splitReturn = this.polygons[this.selectedPolygon].split(this.squareToCut, cut);
    var poly1 = splitReturn.poly1;
    var poly2 = splitReturn.poly2;
    cut = splitReturn.cutLine;
    if (splitReturn.value) {
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(cut.getStart().x, cut.getStart().y);
      this.ctx.lineTo(cut.getEnd().x, cut.getEnd().y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
    if (this.showInfo) {
      var np = this.polygons[this.selectedPolygon].findNearestPoint(this.mouse);
      if (typeof np !== 'undefined' && np !== null && typeof np.x === "number") {
        this.ctx.strokeStyle = "rgba(0,0,0,0.5)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x, this.mouse.y);
        this.ctx.lineTo(np.x, np.y);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    }
    this.ctx.strokeStyle = "rgba(250,0,0,0.5)";
    this.ctx.lineWidth = this.pointOutlineSize;
    this.drawPoly(this.polygons[this.selectedPolygon]);
    for (var i = 0, cnt = this.polygons[this.selectedPolygon].size(); i < cnt; i++) {
      var p = this.polygons[this.selectedPolygon].get(i);
      this.drawCircle(this.ctx, p.x, p.y, this.pointSize);
      if (this.selectedPoint === i) {
        this.ctx.fillStyle = "rgba(255,255,0,0.9)";
        this.ctx.fill();
      } else {
        this.ctx.fillStyle = "rgba(255,255,255,1)";
        this.ctx.fill();
      }
      this.ctx.stroke();
    }
    this.ctx.restore();
  };
  paint = this.paintEvent;
  mouseMoveEvent = e => {
    if (this.mouseLeftPress && this.selectedPolygon != -1 && this.selectedPoint != -1) {
      this.polygons[this.selectedPolygon].get(this.selectedPoint).x = this.polygons[this.selectedPolygon].get(this.selectedPoint).x + (e.clientX - this.mouse_x) / this.scale;
      this.polygons[this.selectedPolygon].get(this.selectedPoint).y = this.polygons[this.selectedPolygon].get(this.selectedPoint).y + (e.clientY - this.mouse_y) / this.scale;
    } else if (this.mouseLeftPress) {
      this.offset_x = this.offset_x + (e.clientX - this.mouse_x);
      this.offset_y = this.offset_y + (e.clientY - this.mouse_y);
    }
    this.mouse_x = e.clientX;
    this.mouse_y = e.clientY;
    this.mouse = new _srcIndexJs.Vector((e.clientX - this.offset_x) / this.scale, (e.clientY - this.offset_y) / this.scale, 0);
    if (this.selectedPolygon != -1) {
      for (var i = 0, cnt = this.polygons[this.selectedPolygon].size(); i < cnt; i++) {
        var p = this.polygons[this.selectedPolygon].get(i);
        var ptocLength = this.mouse.subtraction(p).length();
        if (ptocLength < this.pointSize + this.pointOutlineSize) {
          this.selectedPoint = i;
          this.paint();
          return;
        }
      }
      this.selectedPoint = -1;
    }
    this.paint();
  };
  mouseReleaseEvent = e => {
    if (e.button == 0) {
      console.log("lmouseup");
      this.mouseLeftPress = 0;
      this.selectedPoint = -1;
    }
    if (e.button == 1) {
      console.log("mmouseup");
    }
    if (e.button == 2) {
      console.log("rmouseup");
    }
    return false;
  };
  wheelEvent = e => {
    var delta = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
    if (typeof delta === 'number' && delta != 0) {
      this.scale += 5 * this.scale / (delta * 100);
      this.paint();
    }
    return false;
  };
  /**
  *
  * @param e
  * @returns {boolean}
  */
  mousePressEvent = e => {
    // console.log(e);
    this.mouse_x = e.clientX;
    this.mouse_y = e.clientY;
    this.mouse = new _srcIndexJs.Vector((e.clientX - this.offset_x) / this.scale, (e.clientY - this.offset_y) / this.scale, 0);
    if (e.button == 0) /*lbtn*/
    {
      console.log("lbtn down");
      this.mouseLeftPress = 1;
      for (var i = 0, cnt = this.polygons[this.selectedPolygon].size(); i < cnt; i++) {
        var p = this.polygons[this.selectedPolygon].get(i);
        if (this.mouse.subtraction(p).length() < this.pointSize + this.pointOutlineSize) {
          this.selectedPoint = i;
          this.paint();
          return;
        }
      }
    }
    if (e.button == 1) /*mbtn*/
    {
      console.log("mbtn down");
      if (this.selectedPolygon != -1 && this.mouse instanceof _srcIndexJs.Vector) {
        this.polygons[this.selectedPolygon].splitNearestEdge(this.mouse);
        this.paint();
      }
    }
    if (e.button == 2) /*rbtn*/
    {
      console.log("rbtn down");
      var minDist = Number.MAX_VALUE;
      for (var i = 0, cnt = this.polygons.length; i < cnt; i++) {
        var dist = this.polygons[i].findDistance(this.mouse);
        if (dist < minDist) {
          minDist = dist;
          this.selectedPolygon = i;
        }
      }
      this.squareToCut = this.polygons[this.selectedPolygon].countSquare() / 2.0;
      this.paint();
    }
    return false;
  };
  keyPressEvent = e => {
    console.log("keyevent: ", e);
    if (e.keyCode == 81) /*Q*/
    {
      this.squareToCut += e.shiftKey ? 1000 : 100;
      this.paint();
    }
    if (e.keyCode == 87) /*W*/
    {
      var t = this.squareToCut - (e.shiftKey ? 1000 : 100);
      this.squareToCut = t < 10 ? 10 : t;
      this.paint();
    }
    if (e.keyCode == 67) /*C*/
    {
      var splitReuslt = this.polygons[this.selectedPolygon].split(this.squareToCut);
      var poly1 = splitReuslt.poly1, poly2 = splitReuslt.poly2;
      var cut = splitReuslt.cutLine;
      if (splitReuslt.value) {
        this.polygons[this.selectedPolygon] = poly1;
        this.polygons.push(poly2);
        if (poly1.countSquare() < poly2.countSquare()) {
          this.selectedPolygon = this.polygons.length - 1;
        }
        this.paint();
      }
    }
    if (e.keyCode == 80) /*P*/
    {
      for (var i = 0, cnt = this.polygons[this.selectedPolygon].length; i < cnt; i++) {
        var p = this.polygons[this.selectedPolygon].get(i);
      }
      this.paint();
    }
    if (e.keyCode == 65) /*A*/
    {
      if (this.selectedPolygon > 0) this.selectedPolygon--;
      this.paint();
    }
    if (e.keyCode == 83) /*S*/
    {
      if (this.selectedPolygon < Math.round(this.polygons.length - 1)) this.selectedPolygon++;
      this.paint();
    }
    if (e.keyCode == 82) /*R*/
    {
      this.initPolygons();
      this.paint();
    }
    if (e.keyCode == 73) /*I*/
    {
      this.showInfo = !this.showInfo;
      this.paint();
    }
    if (e.keyCode == 72) /*H*/
    {
      this.showHelp = !this.showHelp;
      this.paint();
    }
  };
  initPolygons = () => {
    this.polygons = new Array();
    this.polygons.push(new _srcIndexJs.Polygon());
    this.polygons[0].push_back(new _srcIndexJs.Vector(450.0, 100.0, 0));
    this.polygons[0].push_back(new _srcIndexJs.Vector(900.0, 100.0, 0));
    this.polygons[0].push_back(new _srcIndexJs.Vector(900.0, 400.0, 0));
    this.polygons[0].push_back(new _srcIndexJs.Vector(450.0, 400.0, 0));
    this.polygons.push(new _srcIndexJs.Polygon());
    this.polygons[1].push_back(new _srcIndexJs.Vector(900.0, 420.0, 0));
    this.polygons[1].push_back(new _srcIndexJs.Vector(900.0, 600.0, 0));
    this.polygons[1].push_back(new _srcIndexJs.Vector(450.0, 600.0, 0));
    this.polygons[1].push_back(new _srcIndexJs.Vector(450.0, 420.0, 0));
    this.squareToCut = this.polygons[0].countSquare() / 47.0;
    this.selectedPolygon = 0;
  };
  drawCircle = (context, centerX, centerY, r) => {
    // draw the colored region
    context.beginPath();
    context.arc(centerX, centerY, r, 0, 2 * Math.PI, true);
    context.closePath();
  };
}
exports.default = RenderArea;
;

},{"../src/index.js":"5rkFb","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5rkFb":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Vector", function () {
  return _VectorJsDefault.default;
});
_parcelHelpers.export(exports, "Vectors", function () {
  return _VectorsJsDefault.default;
});
_parcelHelpers.export(exports, "Line", function () {
  return _LineJsDefault.default;
});
_parcelHelpers.export(exports, "Polygon", function () {
  return _PolygonJsDefault.default;
});
_parcelHelpers.export(exports, "Polygons", function () {
  return _PolygonsJsDefault.default;
});
var _VectorJs = require('./Vector.js');
var _VectorJsDefault = _parcelHelpers.interopDefault(_VectorJs);
var _VectorsJs = require('./Vectors.js');
var _VectorsJsDefault = _parcelHelpers.interopDefault(_VectorsJs);
var _LineJs = require('./Line.js');
var _LineJsDefault = _parcelHelpers.interopDefault(_LineJs);
var _PolygonJs = require('./Polygon.js');
var _PolygonJsDefault = _parcelHelpers.interopDefault(_PolygonJs);
var _PolygonsJs = require('./Polygons.js');
var _PolygonsJsDefault = _parcelHelpers.interopDefault(_PolygonsJs);

},{"./Vector.js":"60Yem","./Vectors.js":"1gzia","./Line.js":"2ujkY","./Polygon.js":"tpz00","./Polygons.js":"NnmHQ","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"60Yem":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class Vector {
  constructor(x, y, z) {
    (this.x = x, this.y = y, this.z = z);
  }
  addition = vector => {
    if (!vector instanceof Vector) throw new Error('param vector was not Vector');
    return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  };
  subtraction = vector => {
    if (!vector instanceof Vector) throw new Error('param vector was not Vector');
    return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  };
  multiplication = num => {
    if (typeof num !== 'number') throw new Error('param num was not numeric');
    return new Vector(this.x * num, this.y * num, this.z * num);
  };
  division = num => {
    if (typeof num !== 'number') throw new Error("param num was not numeric");
    return new Vector(this.x / num, this.y / num, this.z / num);
  };
  dot = vector => {
    if (!vector instanceof Vector) throw new Error('param v was not Vector');
    return this.x * vector.x + this.y * vector.y + this.z + vector.z;
  };
  length = () => {
    return Math.sqrt(this.squareLength());
  };
  squareLength = () => {
    return this.x * this.x + this.y * this.y + (this.z + this.z);
  };
  norm = () => {
    var l = this.length();
    if (l == 0) {
      return new Vector();
    } else {
      return new Vector(this.x / l, this.y / l, this.z / l);
    }
  };
  equals = vector => {
    if (!vector instanceof Vector) throw new Error('param v was not Vector');
    if (this.x == vector.x && this.y == vector.y && this.z == vector.z) {
      return true;
    } else {
      return false;
    }
  };
  toString = () => {
    return `vector(${this.x}, ${this.y}, ${this.z})`;
  };
}
exports.default = Vector;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"1gzia":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _VectorJs = require('./Vector.js');
var _VectorJsDefault = _parcelHelpers.interopDefault(_VectorJs);
class Vectors {
  constructor() {
    this.arrVector = [];
  }
  clear = () => {
    this.arrVector.clear();
  };
  push_back = v => {
    if (!v instanceof _VectorJsDefault.default) throw new Error("param v was not Vector type");
    this.arrVector.push(v);
  };
  get = idx => {
    if (typeof idx === 'number' && this.arrVector.length > idx) return this.arrVector[idx];
  };
  size = () => {
    return this.arrVector.length;
  };
  reverse = () => {
    this.arrVector.reverse();
  };
  empty = () => {
    return this.arrVector.length === 0 ? true : false;
  };
  insert = (index, vector) => {
    if (!vector instanceof _VectorJsDefault.default) throw new Error("param vector was not Vector type");
    this.arrVector.splice(index, 0, vector);
  };
}
exports.default = Vectors;

},{"./Vector.js":"60Yem","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"2ujkY":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _VectorJs = require('./Vector.js');
var _VectorJsDefault = _parcelHelpers.interopDefault(_VectorJs);
class Line {
  static POLY_SPLIT_EPS = 1E-6;
  constructor(a, b, c) {
    this.A = null;
    this.B = null;
    this.C = null;
    this.start = null;
    this.end = null;
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number') {
      this.initFromNumbers(a, b, c);
    } else if (a instanceof _VectorJsDefault.default && b instanceof _VectorJsDefault.default) {
      this.initFromVector(a, b);
    }
  }
  initFromVector = (start, end) => {
    if (!start instanceof _VectorJsDefault.default) throw new Error("param start was not Vector Type");
    if (!end instanceof _VectorJsDefault.default) throw new Error("param end was not Vector Type");
    this.A = start.y - end.y;
    this.B = end.x - start.x;
    this.C = start.x * end.y - end.x * start.y;
    this.start = start;
    this.end = end;
  };
  initFromNumbers = (A, B, C) => {
    if (typeof A === "number" && typeof B === "number" && typeof C === "number") {
      this.start = new _VectorJsDefault.default();
      this.end = new _VectorJsDefault.default();
      if (Math.abs(A) <= Line.POLY_SPLIT_EPS && Math.abs(B) >= Line.POLY_SPLIT_EPS) {
        this.start.x = -1000;
        this.start.y = -(C / B);
        this.end.x = 1000;
        this.end.y = this.start.y;
      } else if (Math.abs(B) <= Line.POLY_SPLIT_EPS && Math.abs(A) >= Line.POLY_SPLIT_EPS) {
        this.start.x = -(C / A);
        this.start.y = -1000;
        this.end.x = this.start.x;
        this.end.y = 1000;
      } else {
        this.start.x = -1000;
        this.start.y = -((A * this.start.x + C) / B);
        this.end.x = 1000;
        this.end.y = -((A * this.end.x + C) / B);
      }
    }
    this.A = A;
    this.B = B;
    this.C = C;
  };
  getStart = () => {
    return this.start;
  };
  getEnd = () => {
    return this.end;
  };
  /**
  * 길이
  * @returns {number}
  */
  length = () => {
    var x = this.end.x - this.start.x;
    var y = this.end.y - this.start.y;
    return Math.sqrt(x * x + y * y);
  };
  squareLength = () => {
    var x = this.end.x - this.start.x;
    var y = this.end.y - this.start.y;
    return x * x + y * y;
  };
  reverse = () => {
    return new Line(this.end, this.start);
  };
  getPointAlong = t => {
    var tempVec = this.end.subtraction(this.start).norm().multiplication(t);
    var result = this.start.addition(tempVec);
    return result;
  };
  getDistance = point => {
    if (typeof point !== 'undefined' && point instanceof _VectorJsDefault.default) {
      var n = this.A * point.x + this.B * point.y + this.C;
      var m = Math.sqrt(this.A * this.A + this.B * this.B);
      return Math.abs(n / m);
    }
  };
  getLineNearestPoint = point => {
    if (typeof point !== 'undefined' && point instanceof _VectorJsDefault.default) {
      var dir = new _VectorJsDefault.default(this.B, -this.A);
      var u = point.subtraction(this.start).dot(dir) / dir.squareLength();
      return this.start.addition(dir.multiplication(u));
    }
  };
  getSegmentNearestPoint = point => {
    if (typeof point === 'undefined') {
      throw new Error("param point was undefined");
    }
    if (!point instanceof _VectorJsDefault.default) {
      throw new Error("param point was not Vector Type");
    }
    var dir = new _VectorJsDefault.default(this.B, -this.A, 0);
    var u = point.subtraction(this.start).dot(dir) / dir.squareLength();
    if (u < 0) return this.start; else if (u > 1) return this.end; else return this.start.addition(dir.multiplication(u));
  };
  pointSide = point => {
    var s = this.A.multiplication(point.x - this.start.x).addition(B.multiplication(point.x - this.start.y));
    return s > 0 ? 1 : s < 0 ? -1 : 0;
  };
  crossLineSegment = line => {
    var d = Line.det(this.A, this.B, line.A, line.B);
    var result = new _VectorJsDefault.default();
    if (d == 0) return 0;
    result.x = -(Line.det(this.C, this.B, line.C, line.B) / d);
    result.y = -(Line.det(this.A, this.C, line.A, line.C) / d);
    return {
      "result": result,
      "value": Line.inside(result.x, Line.minimum(line.start.x, line.end.x), Line.maximum(line.start.x, line.end.x)) && Line.inside(result.y, Line.minimum(line.start.y, line.end.y), Line.maximum(line.start.y, line.end.y))
    };
  };
  crossSegmentSegment = line => {
    var d = Line.det(this.A, this.B, line.A, line.B);
    var result = new _VectorJsDefault.default();
    if (d == 0) return 0;
    result.x = -Line.det(this.C, this.B, line.C, line.B) / d;
    result.y = -Line.det(this.A, this.C, line.A, line.C) / d;
    return {
      "result": result,
      "value": Line.inside(result.x, Line.minimum(this.start.x, this.end.x), Line.maximum(this.start.x, this.end.x)) && Line.inside(result.y, Line.minimum(this.start.y, this.end.y), Line.maximum(this.start.y, this.end.y)) && Line.inside(result.x, Line.minimum(line.start.x, line.end.x), Line.maximum(line.start.x, line.end.x)) && Line.inside(result.y, Line.minimum(line.start.y, line.end.y), Line.maximum(line.start.y, line.end.y))
    };
  };
  crossLineLine = line => {
    var d = Line.det(this.A, this.B, line.A, line.B);
    var result = new _VectorJsDefault.default();
    if (d == 0) return 0;
    result.x = -Line.det(this.C, this.B, line.C, line.B) / d;
    result.y = -Line.det(this.A, this.C, line.A, line.C) / d;
    return {
      "result": result,
      "value": 1
    };
  };
  static getBisector = (l1, l2) => {
    var q1 = Math.sqrt(l1.A * l1.A + l1.B * l1.B);
    var q2 = Math.sqrt(l2.A * l2.A + l2.B * l2.B);
    var A = l1.A / q1 - l2.A / q2;
    var B = l1.B / q1 - l2.B / q2;
    var C = l1.C / q1 - l2.C / q2;
    return {
      "result": new Line(A, B, C),
      "l1": l1,
      "l2": l2
    };
  };
  static getTanAngle = (l1, l2) => {
    return (l1.A * l2.B - l2.A * l1.B) / (l1.A * l2.A + l1.B * l2.B);
  };
  static directedLine = (p, d) => {
    if (!p instanceof _VectorJsDefault.default) throw new Error("param p was not Vector Type");
    if (!d instanceof _VectorJsDefault.default) throw new Error("param d was not Vector Type");
    var l = new Line(p, p.addition(d));
    return l;
  };
  static inside = (v, min, max) => {
    return min <= v + Line.POLY_SPLIT_EPS && v <= max + Line.POLY_SPLIT_EPS;
  };
  static det = (a, b, c, d) => {
    return a * d - b * c;
  };
  static maximum = (a, b) => {
    return a < b ? b : a;
  };
  static minimum = (a, b) => {
    return a > b ? b : a;
  };
  toString = () => {
    return "[" + this.A + ", " + this.B + ", " + this.C + "]-{" + this.getStart() + ", " + this.getEnd() + "}";
  };
}
exports.default = Line;

},{"./Vector.js":"60Yem","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"tpz00":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _VectorJs = require('./Vector.js');
var _VectorJsDefault = _parcelHelpers.interopDefault(_VectorJs);
var _VectorsJs = require('./Vectors.js');
var _VectorsJsDefault = _parcelHelpers.interopDefault(_VectorsJs);
var _LineJs = require('./Line.js');
var _LineJsDefault = _parcelHelpers.interopDefault(_LineJs);
var _PolygonsJs = require('./Polygons.js');
var _PolygonsJsDefault = _parcelHelpers.interopDefault(_PolygonsJs);
class Polygon {
  static POLY_SPLIT_EPS = 1E-6;
  constructor(v) {
    if (typeof v === 'undefined') {
      v = new _VectorsJsDefault.default();
    } else if (!v instanceof _VectorsJsDefault.default) {
      throw new Error("param v was not Vector Type");
    }
    this.poly = v;
  }
  countSquare = () => {
    var t = this.countSquare_signed();
    if (typeof t === 'number') return t < 0 ? t * -1 : t;
  };
  countSquare_signed = () => {
    var pointsCount = this.poly.size();
    if (pointsCount < 3) {
      return 0;
    }
    var result = 0.0;
    for (var i = 0; i < pointsCount; i++) {
      if (i == 0) result += this.poly.get(i).x * (this.poly.get(pointsCount - 1).y - this.poly.get(i + 1).y); else if (i == pointsCount - 1) result += this.poly.get(i).x * (this.poly.get(i - 1).y - this.poly.get(0).y); else result += this.poly.get(i).x * (this.poly.get(i - 1).y - this.poly.get(i + 1).y);
    }
    return result / 2.0;
  };
  split = (square, cutLine) => {
    if (typeof square !== 'number') {
      throw new Error("param square was not defined");
    }
    var polygonSize = Math.round(this.poly.size());
    var polygon = this.poly;
    if (!this.isClockwise()) {
      polygon.arrVector.reverse();
    }
    var poly1 = new Polygon();
    var poly2 = new Polygon();
    if (this.countSquare() - square <= Polygon.POLY_SPLIT_EPS) {
      poly1 = this;
      return {
        "value": 0,
        "poly1": poly1,
        "poly2": poly2,
        "cutLine": cutLine
      };
    }
    var minCutLine_exists = 0;
    var minSqLength = Number.MAX_VALUE;
    for (var i = 0; i < polygonSize - 1; i++) {
      for (var j = i + 1; j < polygonSize; j++) {
        var p1 = new Polygon();
        var p2 = new Polygon();
        var subPoly = Polygon.createSubPoly(polygon, i, j, p1, p2);
        p1 = subPoly.poly1;
        p2 = subPoly.poly2;
        var l1 = new _LineJsDefault.default(polygon.get(i), polygon.get(i + 1));
        var l2 = new _LineJsDefault.default(polygon.get(j), polygon.get(j + 1 < polygonSize ? j + 1 : 0));
        var cut = new _LineJsDefault.default();
        var tempCut = Polygon.getCut(l1, l2, square, p1, p2, cut);
        cut = tempCut.cut;
        if (tempCut.value) {
          var sqLength = cut.squareLength();
          if (sqLength < minSqLength && Polygon.isSegmentInsidePoly(polygon, cut, i, j)) {
            minSqLength = sqLength;
            poly1 = p1;
            poly2 = p2;
            cutLine = cut;
            minCutLine_exists = 1;
          }
        }
      }
    }
    if (minCutLine_exists) {
      poly1.push_back(cutLine.getStart());
      poly1.push_back(cutLine.getEnd());
      poly2.push_back(cutLine.getEnd());
      poly2.push_back(cutLine.getStart());
      return {
        "value": 1,
        "poly1": poly1,
        "poly2": poly2,
        "cutLine": cutLine
      };
    } else {
      poly1 = new Polygon(polygon);
      return {
        "value": 0,
        "poly1": poly1,
        "poly2": poly2,
        "cutLine": cutLine
      };
    }
  };
  indDistance = point => {
    if (typeof point === 'undefined') {
      throw new Error("param point was undefined");
    }
    if (!point instanceof _VectorJsDefault.default) {
      throw new Error("param point was not Vector Type");
    }
    var distance = Number.MAX_VALUE;
    for (var i = 0, cnt = Math.round(this.poly.size() - 1); i < cnt; i++) {
      var line = new _LineJsDefault.default();
      line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
      var p = line.getSegmentNearestPoint(point);
      var l = p.subtraction(point).length();
      if (l < distance) distance = l;
    }
    var line = new _LineJsDefault.default();
    line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance) distance = l;
    return distance;
  };
  findDistance = point => {
    if (typeof point === 'undefined') {
      throw new Error("param point was undefined");
    }
    if (!point instanceof _VectorJsDefault.default) {
      throw new Error("param point was not Vector Type");
    }
    var distance = Number.MAX_VALUE;
    for (var i = 0, cnt = Math.round(this.poly.size() - 1); i < cnt; i++) {
      var line = new _LineJsDefault.default();
      line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
      var p = line.getSegmentNearestPoint(point);
      var l = p.subtraction(point).length();
      if (l < distance) distance = l;
    }
    var line = new _LineJsDefault.default();
    line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance) distance = l;
    return distance;
  };
  findDistance = point => {
    if (typeof point === 'undefined') {
      throw new Error("param point was undefined");
    }
    if (!point instanceof _VectorJsDefault.default) {
      throw new Error("param point was not Vector Type");
    }
    var distance = Number.MAX_VALUE;
    for (var i = 0, cnt = Math.round(this.poly.size() - 1); i < cnt; i++) {
      var line = new _LineJsDefault.default();
      line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
      var p = line.getSegmentNearestPoint(point);
      var l = p.subtraction(point).length();
      if (l < distance) distance = l;
    }
    var line = new _LineJsDefault.default();
    line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance) distance = l;
    return distance;
  };
  findNearestPoint = point => {
    if (typeof point === 'undefined') {
      throw new Error("param point was undefined");
    }
    if (!point instanceof _VectorJsDefault.default) {
      throw new Error("param point was not Vector Type");
    }
    var result = null;
    // Vector type
    var distance = Number.MAX_VALUE;
    for (var i = 0, cnt = Math.round(this.poly.size() - 1); i < cnt; i++) {
      var line = new _LineJsDefault.default();
      line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
      var p = line.getSegmentNearestPoint(point);
      var l = p.subtraction(point).length();
      if (l < distance) {
        distance = l;
        result = p;
      }
    }
    var line = new _LineJsDefault.default();
    line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance) {
      distance = l;
      result = p;
    }
    distance;
    // just remove warning
    return result;
  };
  countCenter = () => {
    return Polygon.polygonCentroid(this.poly);
  };
  splitNearestEdge = point => {
    if (typeof point === 'undefined') throw new Error("param point was undefined");
    if (!point instanceof _VectorJsDefault.default) throw new Error("param point was not Vector Type");
    var result;
    var ri = -1;
    var distance = Number.MAX_VALUE;
    for (var i = 0, cnt = this.poly.size() - 1; i < cnt; i++) {
      var line = new _LineJsDefault.default(this.poly.get(i), this.poly.get(i + 1));
      var p = line.getSegmentNearestPoint(point);
      var l = p.subtraction(point).length();
      if (l < distance) {
        distance = l;
        ri = i;
        result = p;
      }
    }
    var line = new _LineJsDefault.default(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance) {
      distance = l;
      ri = this.poly.size() - 1;
      result = p;
    }
    if (ri != -1) {
      this.poly.insert(ri + 1, result);
    }
  };
  isPointInside = point => {
    if (typeof point === 'undefined') throw new Error("param point was undefined");
    if (!point instanceof _VectorJsDefault.default) throw new Error("param point was not Vector Type");
    return Polygon.isPointInsidePoly(this.poly, point);
  };
  isClockwise = () => {
    var sum = 0;
    var t = Math.round(this.poly.size() - 1);
    for (var i = 0; i < t; i++) {
      sum += (this.poly.get(i + 1).x - this.poly.get(i).x) * (this.poly.get(i + 1).y + this.poly.get(i).y);
    }
    sum += (this.poly.get(0).x - this.poly.get(t).x) * (this.poly.get(0).y + this.poly.get(t).y);
    return sum <= 0;
  };
  getVectors = () => {
    return this.poly;
  };
  push_back = v => {
    if (typeof v !== 'undefined' && v instanceof _VectorJsDefault.default) this.poly.push_back(v);
  };
  empty = () => {
    return this.poly.empty();
  };
  get = idx => {
    if (typeof idx !== 'number') throw new Error("param idx was not number type");
    if (this.poly.size() < idx) throw new Error("param idx was bigger then Vectors size");
    return this.poly.get(idx);
  };
  setPolygon = p => {
    if (p instanceof Polygon) {
      this.poly = p.poly;
      return this;
    }
  };
  clear = () => {
    this.poly.clear();
  };
  size = () => {
    return this.poly.size();
  };
  static createPolygons = (l1, l2, res) => {
    if (!l1 instanceof _LineJsDefault.default) throw new Error("param l1 was not Line type");
    if (!l2 instanceof _LineJsDefault.default) throw new Error("param l2 was not Line type");
    if (!res instanceof _PolygonsJsDefault.default) throw new Error("param res was not Polygons type");
    res.bisector = _LineJsDefault.default.getBisector(l1, l2).result;
    var v1 = l1.getStart(), v2 = l1.getEnd(), v3 = l2.getStart(), v4 = l2.getEnd();
    res.p1_exist = false;
    res.p4_exist = false;
    if (v1 != v4) {
      var l1s = new _LineJsDefault.default(v1, res.bisector.getLineNearestPoint(v1)), p1 = new _VectorJsDefault.default(), cls_l1sl2 = l1s.crossLineSegment(l2, p1);
      p1 = cls_l1sl2.result;
      res.p1_exist = cls_l1sl2.value && p1 != v4;
      if (res.p1_exist) {
        res.leftTriangle.push_back(v1);
        res.leftTriangle.push_back(v4);
        res.leftTriangle.push_back(p1);
        res.trapezoid.push_back(p1);
      } else {
        res.trapezoid.push_back(v4);
      }
      var l2e = new _LineJsDefault.default(v4, res.bisector.getLineNearestPoint(v4)), p4 = new _VectorJsDefault.default(), cls_l2el1 = l2e.crossLineSegment(l1, p4);
      p4 = cls_l2el1.result;
      res.p4_exist = cls_l2el1.value && p4 != v1;
      if (res.p4_exist) {
        res.leftTriangle.push_back(v4);
        res.leftTriangle.push_back(v1);
        res.leftTriangle.push_back(p4);
        res.trapezoid.push_back(p4);
      } else {
        res.trapezoid.push_back(v1);
      }
    } else {
      res.trapezoid.push_back(v4);
      res.trapezoid.push_back(v1);
    }
    res.p2_exist = false;
    res.p3_exist = false;
    if (v2 != v3) {
      var l2s = new _LineJsDefault.default(v3, res.bisector.getLineNearestPoint(v3)), p3 = new _VectorJsDefault.default(), cls_l2sl1 = l2s.crossLineSegment(l1, p3);
      p3 = cls_l2sl1.result;
      res.p3_exist = cls_l2sl1.value && p3 != v2;
      if (res.p3_exist) {
        res.rightTriangle.push_back(v3);
        res.rightTriangle.push_back(v2);
        res.rightTriangle.push_back(p3);
        res.trapezoid.push_back(p3);
      } else {
        res.trapezoid.push_back(v2);
      }
      var l1e = new _LineJsDefault.default(v2, res.bisector.getLineNearestPoint(v2)), p2 = new _VectorJsDefault.default(), cls_l1el2 = l1e.crossLineSegment(l2, p2);
      p2 = cls_l1el2.result;
      res.p2_exist = cls_l1el2.value && p2 != v3;
      if (res.p2_exist) {
        res.rightTriangle.push_back(v2);
        res.rightTriangle.push_back(v3);
        res.rightTriangle.push_back(p2);
        res.trapezoid.push_back(p2);
      } else {
        res.trapezoid.push_back(v3);
      }
    } else {
      res.trapezoid.push_back(v2);
      res.trapezoid.push_back(v3);
    }
    res.leftTriangleSquare = res.leftTriangle.countSquare();
    res.trapezoidSquare = res.trapezoid.countSquare();
    res.rightTriangleSquare = res.rightTriangle.countSquare();
    res.totalSquare = res.leftTriangleSquare + res.trapezoidSquare + res.rightTriangleSquare;
    return res;
  };
  static findCutLine = (square, res, cutLine) => {
    if (square > res.totalSquare) {
      return {
        "value": false
      };
    }
    if (!res.leftTriangle.empty() && square < res.leftTriangleSquare) {
      var m = square / res.leftTriangleSquare;
      var p = res.leftTriangle.get(1).addition(res.leftTriangle.get(2).subtraction(res.leftTriangle.get(1)).multiplication(m));
      if (res.p1_exist) {
        cutLine = new _LineJsDefault.default(p, res.leftTriangle.get(0));
        return {
          "value": true,
          "res": res,
          "cutLine": cutLine
        };
      } else if (res.p4_exist) {
        cutLine = new _LineJsDefault.default(res.leftTriangle.get(0), p);
        return {
          "value": true,
          "res": res,
          "cutLine": cutLine
        };
      }
    } else if (res.leftTriangleSquare < square && square < res.leftTriangleSquare + res.trapezoidSquare) {
      var t = new _LineJsDefault.default(res.trapezoid.get(0), res.trapezoid.get(3));
      var tgA = _LineJsDefault.default.getTanAngle(t, res.bisector);
      var S = square - res.leftTriangleSquare;
      var m;
      if (Math.abs(tgA) > Polygon.POLY_SPLIT_EPS) {
        var a = new _LineJsDefault.default(res.trapezoid.get(0), res.trapezoid.get(1)).length();
        var b = new _LineJsDefault.default(res.trapezoid.get(2), res.trapezoid.get(3)).length();
        var hh = 2.0 * res.trapezoidSquare / (a + b);
        var d = a * a - 4.0 * tgA * S;
        var h = -(-a + Math.sqrt(d)) / (2.0 * tgA);
        m = h / hh;
      } else {
        m = S / res.trapezoidSquare;
      }
      var p = res.trapezoid.get(0).addition(res.trapezoid.get(3).subtraction(res.trapezoid.get(0)).multiplication(m));
      var pp = res.trapezoid.get(1).addition(res.trapezoid.get(2).subtraction(res.trapezoid.get(1)).multiplication(m));
      cutLine = new _LineJsDefault.default(p, pp);
      return {
        "value": true,
        "res": res,
        "cutLine": cutLine
      };
    } else if (!res.rightTriangle.empty() && square > res.leftTriangleSquare + res.trapezoidSquare) {
      var S = square - res.leftTriangleSquare - res.trapezoidSquare;
      var m = S / res.rightTriangleSquare;
      var p = res.rightTriangle.get(2).addition(res.rightTriangle.get(1).subtraction(res.rightTriangle.get(2)).multiplication(m));
      if (res.p3_exist) {
        cutLine = new _LineJsDefault.default(res.rightTriangle.get(0), p);
        return {
          "value": true,
          "res": res,
          "cutLine": cutLine
        };
      } else if (res.p2_exist) {
        cutLine = new _LineJsDefault.default(p, res.rightTriangle.get(0));
        return {
          "value": true,
          "res": res,
          "cutLine": cutLine
        };
      }
    }
    return {
      "value": false,
      "res": res,
      "cutLine": cutLine
    };
  };
  static getCut = (l1, l2, s, poly1, poly2, cut) => {
    if (!l1 instanceof _LineJsDefault.default) throw new Error("param l1 was not Line type");
    if (!l2 instanceof _LineJsDefault.default) throw new Error("param l2 was not Line type");
    if (!poly1 instanceof Polygon) throw new Error("param poly1 was not Polygon type");
    if (!poly2 instanceof Polygon) throw new Error("param poly2 was not Polygon type");
    if (typeof s !== "number") throw new Error("param s was not number type");
    var sn1 = s + poly2.countSquare_signed();
    var sn2 = s + poly1.countSquare_signed();
    if (sn1 > 0) {
      var res = new _PolygonsJsDefault.default();
      res = Polygon.createPolygons(l1, l2, res);
      var findCutLineRes = Polygon.findCutLine(sn1, res, cut), cut = findCutLineRes.cutLine;
      if (findCutLineRes.value) {
        return {
          "value": true,
          "cut": cut
        };
      }
    } else if (sn2 > 0) {
      var res = new _PolygonsJsDefault.default();
      res = Polygon.createPolygons(l2, l1, res);
      var findCutLineRes = Polygon.findCutLine(sn2, res, cut), cut = findCutLineRes.cutLine;
      if (findCutLineRes.value) {
        cut = cut.reverse();
        return {
          "value": true,
          "cut": cut
        };
      }
    }
    return {
      "value": false,
      "cut": cut
    };
  };
  /**
  *
  * @param poly {Vectors}
  * @param line1 {number}
  * @param line2 {number}
  * @returns {{poly1: Polygon, poly2: Polygon}}
  */
  static createSubPoly = (poly, line1, line2, poly1, poly2) => {
    if (!poly instanceof _VectorsJsDefault.default) {
      throw new Error("param poly was not Vectors Type");
    }
    (poly1 = new Polygon(), poly2 = new Polygon());
    var pc1 = line2 - line1;
    for (var i = 1; i <= pc1; i++) {
      poly1.push_back(poly.get(i + line1));
    }
    var polySize = poly.size();
    var pc2 = polySize - pc1;
    for (var i = 1; i <= pc2; i++) {
      poly2.push_back(poly.get((i + line2) % polySize));
    }
    return {
      "poly1": poly1,
      "poly2": poly2
    };
  };
  static isPointInsidePoly = (poly, point) => {
    var pointsCount = Math.round(poly.size() - 1);
    var l = _LineJsDefault.default.directedLine(point, new _VectorJsDefault.default(0.0, 1e100));
    var result = 0;
    var res;
    var v;
    for (var i = 0; i < pointsCount; i++) {
      var line = new _LineJsDefault.default(poly.get(i), poly.get(i + 1));
      res = l.crossSegmentSegment(line);
      result += res.value;
    }
    var line = new _LineJsDefault.default(poly.get(pointsCount), poly.get(0));
    res = l.crossSegmentSegment(line);
    result += res.value;
    return result % 2 != 0;
  };
  static isSegmentInsidePoly = (poly, l, excludeLine1, excludeLine2) => {
    var pointsCount = poly.size();
    for (var i = 0; i < pointsCount; i++) {
      if (i != excludeLine1 && i != excludeLine2) {
        var p1 = poly.get(i);
        var p2 = poly.get(i + 1 < pointsCount ? i + 1 : 0);
        var p = new _VectorJsDefault.default(), css = new _LineJsDefault.default(p1, p2).crossSegmentSegment(l, p);
        p = css.result;
        if (css.value) {
          if (p1.subtraction(p).squareLength() > Polygon.POLY_SPLIT_EPS) {
            if (p2.subtraction(p).squareLength() > Polygon.POLY_SPLIT_EPS) {
              return 0;
            }
          }
        }
      }
    }
    return Polygon.isPointInsidePoly(poly, l.getPointAlong(0.5));
  };
  static polygonCentroid = points => {
    var n = points.size();
    var result = new _VectorJsDefault.default(0, 0, 0);
    for (var i = 0; i < n; i++) result = result.addition(points.get(i));
    result = result.division(n);
    return result;
  };
}
exports.default = Polygon;

},{"./Vector.js":"60Yem","./Vectors.js":"1gzia","./Line.js":"2ujkY","./Polygons.js":"NnmHQ","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"NnmHQ":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _PolygonJs = require('./Polygon.js');
var _PolygonJsDefault = _parcelHelpers.interopDefault(_PolygonJs);
var _LineJs = require('./Line.js');
var _LineJsDefault = _parcelHelpers.interopDefault(_LineJs);
class Polygons {
  constructor() {
    this.bisector = new _LineJsDefault.default();
    this.leftTriangle = new _PolygonJsDefault.default();
    this.trapezoid = new _PolygonJsDefault.default();
    this.rightTriangle = new _PolygonJsDefault.default();
    this.p1_exist = false;
    this.p2_exist = false;
    this.p3_exist = false;
    this.p4_exist = false;
    this.leftTriangleSquare = 0;
    this.trapezoidSquare = 0;
    this.rightTriangleSquare = 0;
    this.totalSquare = 0;
  }
}
exports.default = Polygons;
;

},{"./Polygon.js":"tpz00","./Line.js":"2ujkY","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["4sONq","4EXUw"], "4EXUw", "parcelRequire5b73")

//# sourceMappingURL=index.e2c23b48.js.map
