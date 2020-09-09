import RenderArea from "../app/renderArea.js";

let renderArea;
const ctx = document.getElementById("cvs").getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
window.onresize = function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    canvasSize = { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    console.log("onresize");
};

window.onload = function () {
    renderArea = new RenderArea({ ctx });
    renderArea.initPolygons();
    renderArea.paint();

    document.onkeyup = renderArea.keyPressEvent;
    document.getElementById("cvs").onwheel = renderArea.wheelEvent;
    document.getElementById("cvs").onmousemove = renderArea.mouseMoveEvent;
    document.getElementById("cvs").onmouseup = renderArea.mouseReleaseEvent;
    document.getElementById("cvs").onmousedown = renderArea.mousePressEvent;
    document.getElementById("cvs").oncontextmenu = function () { return false; };

}




