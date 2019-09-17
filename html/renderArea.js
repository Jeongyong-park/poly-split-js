/**
 * Created by jyp on 2016-05-19.
 */
// import {Vector, Vectors, Polygon, Line} from './index.js'
var polygons = new Array();
var polygons_color = new Array();
var squareToCut;
var selectedPolygon = -1;
var showInfo = 0;
var showHelp = 1;
var scale = 1;
var offset_x = 0;
var offset_y = 0;

var mouseLeftPress = 0;
var mouse_x;
var mouse_y;
var mouse = new Vector(0, 0, 0);
var pointSize = 5;
var selectedPoint = -1;

polygons_color.push("darkRed");
polygons_color.push("green");
polygons_color.push("darkGreen");
polygons_color.push("blue");
polygons_color.push("darkBlue");
polygons_color.push("cyan");
polygons_color.push("darkCyan");
polygons_color.push("magenta");
polygons_color.push("darkMagenta");
polygons_color.push("darkYellow");
polygons_color.push("gray");
polygons_color.push("darkGray");


var drawPoly = function (poly) {

    ctx.beginPath();

    var point = poly.get(0);
    ctx.moveTo(point.x, point.y);
    for (var i = 1, cnt = poly.size(); i < cnt; i++) {
        point = poly.get(i);
        ctx.lineTo(point.x, point.y);
    }

    ctx.closePath();
    //ctx.strokeStyle = "#000000";
    //ctx.lineWidth = 1;
    //ctx.fillStyle = "rgba(0,200,0,.4)";
    ctx.globalAlpha = 0.1;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.stroke();

};

var findCutLine = function () {

};

var paintEvent = function () {


    ctx.clearRect(canvasSize.top, canvasSize.left, canvasSize.width, canvasSize.height);
    if (showHelp) {
        ctx.font = "13px 'Segoe UI'";
        ctx.fillStyle = "#000";
        var y = 0, dy = 13 + 1.0;
        ctx.fillText("Cut Area Square: " + Number(squareToCut), 10, y += dy);
        ctx.fillText("Current Scale: " + Number(scale), 10, y += dy);
        ctx.fillText("Selected Polygon: " + selectedPolygon + " / " + polygons.length, 10, y += dy);
        ctx.fillText("Selected Vertex: " + selectedPoint, 10, y += dy);
        ctx.fillText("Q/W - increase/decrease cut area square to 100", 10, y += dy);
        ctx.fillText("q/w - increase/decrease cut area square to 10", 10, y += dy);
        ctx.fillText("a/s - switch between areas", 10, y += dy);
        ctx.fillText("r - to restore initial polygon", 10, y += dy);
        ctx.fillText("i - show/hide polygons square value", 10, y += dy);
        ctx.fillText("c - to cut area as black cut line shows", 10, y += dy);
        ctx.fillText("h - show/hide this text", 10, y += dy);
        ctx.fillText("Mouse wheel to adjust scale", 10, y += dy);
        ctx.fillText("Left mouse click and drag'n'drop on background to move all scene", 10, y += dy);
        ctx.fillText("Left mouse click and drag'n'drop on vertex to move vertices", 10, y += dy);
        ctx.fillText("Right mouse click to select nearest polygon", 10, y += dy);
        ctx.fillText("Middle mouse click to split edge of selected polygon", 10, y + dy);
    }
    ctx.save();
    ctx.translate(offset_x, offset_y);
    ctx.scale(scale, scale);

    for (var i = 0; i < polygons.length; i++) {
        var color = polygons_color[i % polygons_color.length];
        //if(i==selectedPolygon)color="red";
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        //ctx.fillStyle.opacity= 1;
        ctx.lineWidth = 1;
        drawPoly(polygons[i]);
        if (showInfo) {
            var p = polygons[i].countCenter();
            ctx.font = "normal 12px 'malgun gothic'";

            ctx.fillText(polygons[i].countSquare(), p.x, p.y);

        }
    }

    //debugger;
    var cut = new Line();
    var splitReturn = polygons[selectedPolygon].split(squareToCut, cut);
    var poly1 = splitReturn.poly1;
    var poly2 = splitReturn.poly2;
    cut = splitReturn.cutLine;
    if (splitReturn.value) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(cut.getStart().x, cut.getStart().y);
        ctx.lineTo(cut.getEnd().x, cut.getEnd().y);
        ctx.closePath();
        ctx.stroke();

    }

    if (showInfo) {
        var np = polygons[selectedPolygon].findNearestPoint(mouse);
        if (typeof np !== 'undefined' && np !== null && typeof np.x === "number") {
            ctx.strokeStyle = "rgba(0,0,0,0.5)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(np.x, np.y);
            ctx.closePath();
            ctx.stroke();
        }

    }

    ctx.strokeStyle = "rgba(250,0,0,0.5)";

    ctx.lineWidth = 3;
    drawPoly(polygons[selectedPolygon]);
    for (var i = 0, cnt = polygons[selectedPolygon].size(); i < cnt; i++) {
        var p = polygons[selectedPolygon].get(i);
        drawCircle(ctx, p.x, p.y, pointSize);
        if (selectedPoint === i) {
            ctx.fillStyle = "rgba(255,255,0,0.9)";
            ctx.fill();
        } else {
            ctx.fillStyle = "rgba(255,255,255,1)";
            ctx.fill();
        }
        ctx.stroke();
    }

    ctx.restore();
};


var mouseMoveEvent = function (e) {
    if (mouseLeftPress && selectedPolygon != -1 && selectedPoint != -1) {
        polygons[selectedPolygon].get(selectedPoint).x = polygons[selectedPolygon].get(selectedPoint).x + (e.clientX - mouse_x) / scale;
        polygons[selectedPolygon].get(selectedPoint).y = polygons[selectedPolygon].get(selectedPoint).y + (e.clientY - mouse_y) / scale;
    } else if (mouseLeftPress) {
        offset_x = offset_x + (e.clientX - mouse_x);
        offset_y = offset_y + (e.clientY - mouse_y);
    }

    mouse_x = e.clientX;
    mouse_y = e.clientY;
    mouse = new Vector((e.clientX - offset_x) / scale, (e.clientY - offset_y) / scale);

    if (selectedPolygon != -1) {
        for (var i = 0, cnt = polygons[selectedPolygon].size(); i < cnt; i++) {
            var p = polygons[selectedPolygon].get(i);
            var ptocLength = mouse.subtraction(p).length();
            if (ptocLength < pointSize + 3.0) {
                selectedPoint = i;
                //console.log("ptocLength: ", ptocLength);
                paint();
                return;
            }
        }
        selectedPoint = -1;
    }


    paint();
};


var mouseReleaseEvent = function (e) {
    // console.log(e);

    if (e.button == 0) {
        console.log("lmouseup");
        mouseLeftPress = 0;
        selectedPoint = -1;
    }
    if (e.button == 1) {
        console.log("mmouseup");

    }

    if (e.button == 2) {
        console.log("rmouseup");

    }
    return false;

};

var wheelEvent = function (e) {


    var delta = e.deltaY > 0 ? 1 : (e.deltaY < 0 ? -1 : 0);

    if (typeof delta === 'number' && delta != 0) {
        scale += 5 * scale / (delta * 100);
        paint();
    }

    return false;
};

/**
 * 마우스 버튼 눌림 이벤트 핸들러
 * @param e
 * @returns {boolean}
 */
var mousePressEvent = function (e) {
    // console.log(e);
    mouse_x = e.clientX;
    mouse_y = e.clientY;

    mouse = new Vector((e.clientX - offset_x) / scale, (e.clientY - offset_y) / scale, 0);

    if (e.button == 0/*lbtn*/) {
        console.log("lbtn down");
        mouseLeftPress = 1;
        for (var i = 0, cnt = polygons[selectedPolygon].size(); i < cnt; i++) {
            var p = polygons[selectedPolygon].get(i);
            if (mouse.subtraction(p).length() < pointSize + 3.0) {
                selectedPoint = i;
                return;
            }
        }
    }

    if (e.button == 1/*mbtn*/) {
        console.log("mbtn down");
        if (selectedPolygon != -1 && mouse instanceof Vector) {
            polygons[selectedPolygon].splitNearestEdge(mouse);
            paint();
        }
    }

    if (e.button == 2/*rbtn*/) {
        console.log("rbtn down");
        var minDist = Number.MAX_VALUE;
        for (var i = 0, cnt = polygons.length; i < cnt; i++) {
            var dist = polygons[i].findDistance(mouse);
            if (dist < minDist) {
                minDist = dist;
                selectedPolygon = i;
            }
        }
        squareToCut = polygons[selectedPolygon].countSquare() / 2.0;
        paint();
    }
    return false;
};

var ke = null;

var keyPressEvent = function (e) {
    console.log("keyevent: ", e);
    if (e.keyCode == 81/*Q*/) {
        squareToCut += (e.shiftKey ? 1000 : 100);
        paint();
    }

    if (e.keyCode == 87/*W*/) {
        var t = squareToCut - (e.shiftKey ? 1000 : 100);
        squareToCut = t < 10 ? 10 : t;
        paint();
    }
    if (e.keyCode == 67/*C*/) {
        var splitReuslt = polygons[selectedPolygon].split(squareToCut);
        var poly1 = splitReuslt.poly1, poly2 = splitReuslt.poly2;
        var cut = splitReuslt.cutLine;
        if (splitReuslt.value) {
            polygons[selectedPolygon] = poly1;
            polygons.push(poly2);

            if (poly1.countSquare() < poly2.countSquare()) {
                selectedPolygon = polygons.length - 1;
            }

            paint();
        }
    }
    if (e.keyCode == 80/*P*/) {
        for (var i = 0, cnt = polygons[selectedPolygon].length; i < cnt; i++) {
            var p = polygons[selectedPolygon].get(i);//vector
        }
        paint();
    }

    if (e.keyCode == 65/*A*/) {
        if (selectedPolygon > 0)
            selectedPolygon--;
        paint();
    }

    if (e.keyCode == 83/*S*/) {
        if (selectedPolygon < Math.round(polygons.length - 1))
            selectedPolygon++;
        paint();
    }

    if (e.keyCode == 82/*R*/) {
        initPolygons();
        paint();
    }

    if (e.keyCode == 73/*I*/) {
        showInfo = !showInfo;
        paint();
    }

    if (e.keyCode == 72/*H*/) {
        showHelp = !showHelp;
        paint();
    }

};

var initPolygons = function () {
    polygons = new Array();
    polygons.push(new Polygon());
    polygons[0].push_back(new Vector(450.0, 100.0));
    polygons[0].push_back(new Vector(900.0, 100.0));
    polygons[0].push_back(new Vector(900.0, 400.0));
    polygons[0].push_back(new Vector(450.0, 400.0));
    polygons.push(new Polygon());
    polygons[1].push_back(new Vector(900.0, 420.0));
    polygons[1].push_back(new Vector(900.0, 600.0));
    polygons[1].push_back(new Vector(450.0, 600.0));
    polygons[1].push_back(new Vector(450.0, 420.0));
    squareToCut = polygons[0].countSquare() / 47.0;
    selectedPolygon = 0;
};

var drawCircle = function (context, centerX, centerY, r) {
    // draw the colored region
    context.beginPath();
    context.arc(centerX, centerY, r, 0, 2 * Math.PI, true);
    context.closePath();
}