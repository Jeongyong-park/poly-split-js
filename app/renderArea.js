//const Vecotr = require('../src/').vector;
import { Vector, Vectors, Polygon, Polygons, Line } from '../src/index.js';
// import Vector from './modules/Vector.js';
// import Polygon from './modules/Polygon.js';
// import Polygons from './modules/Polygons.js';
// import Line from './modules/Line.js';
/**
 * Created by jyp on 2016-05-19.
 */

export default class RenderArea {

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
        this.mouse = new Vector(0, 0, 0);
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


        this.canvasSize = { top: this.ctx.canvas.offsetTop, left: this.ctx.canvas.offsetLeft, width: this.ctx.canvas.width, height: this.ctx.canvas.height };
    }


    drawPoly = (poly) => {

        this.ctx.beginPath();

        var point = poly.get(0);
        this.ctx.moveTo(point.x, point.y);
        for (var i = 1, cnt = poly.size(); i < cnt; i++) {
            point = poly.get(i);
            this.ctx.lineTo(point.x, point.y);
        }

        this.ctx.closePath();
        //this.ctx.strokeStyle = "#000000";
        //this.ctx.lineWidth = 1;
        //this.ctx.fillStyle = "rgba(0,200,0,.4)";
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
            //if(i==this.selectedPolygon)color="red";
            this.ctx.strokeStyle = color;
            this.ctx.fillStyle = color;
            //this.ctx.fillStyle.opacity= 1;
            this.ctx.lineWidth = 1;
            this.drawPoly(this.polygons[i]);
            if (this.showInfo) {
                var p = this.polygons[i].countCenter();
                this.ctx.font = "normal 12px 'malgun gothic'";

                this.ctx.fillText(this.polygons[i].countSquare(), p.x, p.y);

            }
        }

        //debugger;
        var cut = new Line();
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


    mouseMoveEvent = (e) => {
        if (this.mouseLeftPress && this.selectedPolygon != -1 && this.selectedPoint != -1) {
            this.polygons[this.selectedPolygon].get(this.selectedPoint).x = this.polygons[this.selectedPolygon].get(this.selectedPoint).x + (e.clientX - this.mouse_x) / this.scale;
            this.polygons[this.selectedPolygon].get(this.selectedPoint).y = this.polygons[this.selectedPolygon].get(this.selectedPoint).y + (e.clientY - this.mouse_y) / this.scale;
        } else if (this.mouseLeftPress) {
            this.offset_x = this.offset_x + (e.clientX - this.mouse_x);
            this.offset_y = this.offset_y + (e.clientY - this.mouse_y);
        }

        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;
        this.mouse = new Vector((e.clientX - this.offset_x) / this.scale, (e.clientY - this.offset_y) / this.scale, 0);

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


    mouseReleaseEvent = (e) => {
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

    wheelEvent = (e) => {


        var delta = e.deltaY > 0 ? 1 : (e.deltaY < 0 ? -1 : 0);

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
    mousePressEvent = (e) => {
        // console.log(e);
        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;

        this.mouse = new Vector((e.clientX - this.offset_x) / this.scale, (e.clientY - this.offset_y) / this.scale, 0);

        if (e.button == 0/*lbtn*/) {
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

        if (e.button == 1/*mbtn*/) {
            console.log("mbtn down");
            if (this.selectedPolygon != -1 && this.mouse instanceof Vector) {
                this.polygons[this.selectedPolygon].splitNearestEdge(this.mouse);
                this.paint();
            }
        }

        if (e.button == 2/*rbtn*/) {
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



    keyPressEvent = (e) => {
        console.log("keyevent: ", e);
        if (e.keyCode == 81/*Q*/) {
            this.squareToCut += (e.shiftKey ? 1000 : 100);
            this.paint();
        }

        if (e.keyCode == 87/*W*/) {
            var t = this.squareToCut - (e.shiftKey ? 1000 : 100);
            this.squareToCut = t < 10 ? 10 : t;
            this.paint();
        }
        if (e.keyCode == 67/*C*/) {
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
        if (e.keyCode == 80/*P*/) {
            for (var i = 0, cnt = this.polygons[this.selectedPolygon].length; i < cnt; i++) {
                var p = this.polygons[this.selectedPolygon].get(i);//vector
            }
            this.paint();
        }

        if (e.keyCode == 65/*A*/) {
            if (this.selectedPolygon > 0)
                this.selectedPolygon--;
            this.paint();
        }

        if (e.keyCode == 83/*S*/) {
            if (this.selectedPolygon < Math.round(this.polygons.length - 1))
                this.selectedPolygon++;
            this.paint();
        }

        if (e.keyCode == 82/*R*/) {
            this.initPolygons();
            this.paint();
        }

        if (e.keyCode == 73/*I*/) {
            this.showInfo = !this.showInfo;
            this.paint();
        }

        if (e.keyCode == 72/*H*/) {
            this.showHelp = !this.showHelp;
            this.paint();
        }

    };

    initPolygons = () => {
        this.polygons = new Array();
        this.polygons.push(new Polygon());
        this.polygons[0].push_back(new Vector(450.0, 100.0, 0));
        this.polygons[0].push_back(new Vector(900.0, 100.0, 0));
        this.polygons[0].push_back(new Vector(900.0, 400.0, 0));
        this.polygons[0].push_back(new Vector(450.0, 400.0, 0));
        this.polygons.push(new Polygon());
        this.polygons[1].push_back(new Vector(900.0, 420.0, 0));
        this.polygons[1].push_back(new Vector(900.0, 600.0, 0));
        this.polygons[1].push_back(new Vector(450.0, 600.0, 0));
        this.polygons[1].push_back(new Vector(450.0, 420.0, 0));
        this.squareToCut = this.polygons[0].countSquare() / 47.0;
        this.selectedPolygon = 0;
    };

    drawCircle = (context, centerX, centerY, r) => {
        // draw the colored region
        context.beginPath();
        context.arc(centerX, centerY, r, 0, 2 * Math.PI, true);
        context.closePath();
    }
};