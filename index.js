(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by jyp on 2016-05-16.
 */

var POLY_SPLIT_EPS = 1E-6;
function Line (a, b, c) {
    this.A=null;
    this.B=null;
    this.C=null;
    this.start=null;
    this.end=null;

    if(typeof a ==='number' && typeof b ==='number'  && typeof c ==='number'){
        this.initFromNumbers(a, b, c);
    }else if(a instanceof Vector && b instanceof Vector){
        this.initFromVector(a, b);
    }
}

Line.prototype.initFromVector = function (start, end){
    if (! start instanceof Vector) throw new Error("param start was not Vector Type");
    if (!end instanceof  Vector)throw new Error("param end was not Vector Type");

    this.A = start.y - end.y;
    this.B = end.x - start.x;
    this.C = start.x * end.y - end.x * start.y;
    this.start = start;
    this.end = end;

};

Line.prototype.initFromNumbers = function (A, B, C){
    if(typeof A ==="number" && typeof B ==="number" && typeof C ==="number" ){
        this.start = new Vector();
        this.end= new Vector();

        if(Math.abs(A) <=POLY_SPLIT_EPS && Math.abs(B) >= POLY_SPLIT_EPS){
            this.start.x = -1000;
            this.start.y = -(C/B);

            this.end.x = 1000;
            this.end.y = this.start.y;
        }
        else if(Math.abs(B) <= POLY_SPLIT_EPS && Math.abs(A) >= POLY_SPLIT_EPS){
            this.start.x = -(C / A);
            this.start.y = -1000;
            this.end.x = this.start.x;
            this.end.y = 1000;
        }
        else{
            this.start.x = -1000;
            this.start.y = -((A * this.start.x + C) / B);

            this.end.x = 1000;
            this.end.y = -((A * this.end.x +C) /B);
        }
    }
        this.A=A;this.B= B; this.C = C;
};

Line.prototype.getStart = function(){
    return this.start;
};
Line.prototype.getEnd = function(){
    return this.end;
};

/**
 * 길이
 * @returns {number}
 */
Line.prototype.length = function(){
    var x = this.end.x - this.start.x;
    var y = this.end.y - this.start.y;
    return Math.sqrt( x * x + y * y);
};

/**
 * 길이제곱승
 * @returns {number}
 */
Line.prototype.squareLength = function (){
    var x = this.end.x - this.start.x;
    var y = this.end.y - this.start.y;
    return ( x * x + y * y);
};

/**
 * 반전
 * @returns {Line}
 */
Line.prototype.reverse = function (){
    return new Line(this.end, this.start);
};

 Line.prototype.getPointAlong = function ( t ){
    var tempVec = this.end.subtraction(this.start).norm().multiplication(t);
    var result = this.start.addition(tempVec);
    return result;
};

/**
 * 지점까지의 길이
 * @param point
 * @returns {number}
 */
Line.prototype.getDistance = function( point ) {
    if (typeof point !== 'undefined' && point instanceof Vector) {
        var n = this.A * point.x + this.B * point.y + this.C;
        var m = Math.sqrt(this.A * this.A + this.B * this.B);

        return Math.abs(n/m);
    }
};

/**
 *
 * @param point
 * @returns {*}
 */
Line.prototype.getLineNearestPoint = function (point) {
    if (typeof point !== 'undefined' && point instanceof Vector) {
        var dir = new Vector(this.B, -this.A);
        var u = (point.subtraction(this.start)).dot(dir)/dir.squareLength();
        return this.start.addition(dir.multiplication(u));
    }
};

/**
 * a
 * @param point
 * @returns {*}
 */
Line.prototype.getSegmentNearestPoint = function (point) {
    if (typeof point === 'undefined'){
        throw new Error("param point was undefined");
    }
    if (! point instanceof Vector ) {
        throw new Error("param point was not Vector Type");
    }
    var dir = new Vector(this.B, -this.A, 0);
    var u = (point.subtraction(this.start)).dot(dir)/dir.squareLength();

    if(u<0)
        return this.start;
    else if(u>1)
        return this.end;
    else
        return this.start.addition(dir.multiplication(u));

};

Line.prototype.pointSide =function ( point){
    var s = this.A.multiplication(point.x - this.start.x).addition(B.multiplication(point.x - this.start.y));
    return (s > 0 ? 1 : ( s < 0 ? -1: 0 ));
};


Line.prototype.crossLineSegment = function (line) {
    var d = Line.det(this.A, this.B, line.A, line.B);
    var result = new Vector();
    if( d == 0) return 0;

    result.x = -(Line.det(this.C, this.B, line.C, line.B) / d);
    result.y = -(Line.det(this.A, this.C, line.A, line.C) / d);

    return {"result":result, "value": Line.inside(result.x, Line.minimum(line.start.x, line.end.x), Line.maximum(line.start.x,line.end.x)) &&
            Line.inside(result.y, Line.minimum(line.start.y, line.end.y), Line.maximum(line.start.y,line.end.y))};
};

Line.prototype.crossSegmentSegment = function (line){
    var d = Line.det(this.A, this.B,line.A,line.B);
    var result = new Vector();
    if(d == 0) return 0;


    result.x = - Line.det(this.C, this.B, line.C, line.B) / d;
    result.y = - Line.det(this.A, this.C, line.A, line.C) / d;

    return {"result":result, "value":Line.inside(result.x, Line.minimum(this.start.x, this.end.x), Line.maximum(this.start.x,this.end.x)) &&
            Line.inside(result.y, Line.minimum(this.start.y, this.end.y), Line.maximum(this.start.y,this.end.y)) &&
            Line.inside(result.x, Line.minimum(line.start.x, line.end.x), Line.maximum(line.start.x,line.end.x)) &&
            Line.inside(result.y, Line.minimum(line.start.y, line.end.y), Line.maximum(line.start.y,line.end.y))};
};

Line.prototype.crossLineLine = function (line ){
    var d = Line.det(this.A, this.B,line.A,line.B);
    var result = new Vector();
    if(d == 0) return 0;

    result.x = - Line.det(this.C, this.B, line.C, line.B) / d;
    result.y = - Line.det(this.A, this.C, line.A, line.C) / d;

    return {"result":result, "value": 1 };
};

/**
 *
 * @param l1
 * @param l2
 */
Line.getBisector = function (l1, l2 ){
    var q1 = Math.sqrt(l1.A * l1.A + l1.B * l1.B);
    var q2 = Math.sqrt(l2.A * l2.A + l2.B * l2.B);

    var A = l1.A / q1 - l2.A / q2;
    var B = l1.B / q1 - l2.B / q2;
    var C = l1.C / q1 - l2.C / q2;

    return {"result":new Line(A, B, C), "l1":l1, "l2":l2};
};

/**
 *
 * @param l1
 * @param l2
 * @returns {number}
 */
Line.getTanAngle = function (l1, l2){
    return (l1.A * l2.B - l2.A * l1.B) / (l1.A * l2.A + l1.B * l2.B);
};

Line.directedLine = function (p, d){
    if(!p instanceof Vector) throw new Error("param p was not Vector Type");
    if(!d instanceof Vector) throw new Error("param d was not Vector Type");
    var l = new Line(p, p.addition(d));
    return l;
};

Line.inside = function (v, min, max) {return (((min) <= (v) + (POLY_SPLIT_EPS)) && ((v) <= (max) + (POLY_SPLIT_EPS)))};
Line.det = function (a,b,c,d){return (((a) * (d)) - ((b) * (c)))};

Line.prototype.toString = function(){
    return "["+ this.A + ", " + this.B + ", "+ this.C + "]-{"+this.getStart()+", "+this.getEnd()+"}";
};
Line.maximum = function(a, b){return (((a) < (b)) ? (b) : (a))};
Line.minimum = function(a, b){return (((a) > (b)) ? (b) : (a))};
},{}],2:[function(require,module,exports){
/**
 * Created by jyp on 2016-05-16.
 */

/**
 *
 * @param v {Vectors=}
 * @constructor
 */
function Polygon( v ){

    if( typeof v ==='undefined'){
        v = new Vectors();
    } else if(!v instanceof Vectors) {
        throw new Error("param v was not Vector Type");
    }

    this.poly = v;
}

Polygon.prototype.countSquare = function (){
    var t = this.countSquare_signed();
    if(typeof t ==='number')
        return t < 0? t * -1 : t; //절대 값
};

Polygon.prototype.countSquare_signed = function(){
    var pointsCount = this.poly.size();
    if(pointsCount < 3){
        return 0;
    }

    var result = 0.0;
    for(var i = 0; i < pointsCount; i++){
        if(i==0)
            result += this.poly.get(i).x * (this.poly.get(pointsCount-1).y - this.poly.get(i+1).y);
        else if(i== pointsCount - 1)
            result += this.poly.get(i).x * (this.poly.get(i - 1).y - this.poly.get(0).y );
        else
            result += this.poly.get(i).x * (this.poly.get(i - 1).y - this.poly.get(i + 1).y);
    }
    return result / 2.0;
};

//Polygon.prototype.split =function(square, poly1, poly2, cutLine){


Polygon.prototype.split =function(square, cutLine){
    if( typeof square !=='number'){
        throw new Error("param square was not defined");
    }

    var polygonSize =  Math.round(this.poly.size());
    var polygon =this.poly;
    if(!this.isClockwise())
    {
        polygon.arrVector.reverse();
    }

    var poly1 = new Polygon();
    var poly2 = new Polygon();

    if(this.countSquare() - square <= POLY_SPLIT_EPS){
        poly1 = this;
        return {"value":0, "poly1":poly1, "poly2":poly2, "cutLine":cutLine};
    }

    var minCutLine_exists = 0;
    var minSqLength = Number.MAX_VALUE;

    for(var i = 0; i< polygonSize - 1; i++)
    {
        for(var j = i + 1; j < polygonSize; j++)
        {
            var p1 = new Polygon();
            var p2 = new Polygon();

            var subPoly = Polygon.createSubPoly(polygon, i, j, p1, p2);
            p1 = subPoly.poly1;
            p2 = subPoly.poly2;

            var l1 = new Line(polygon.get(i), polygon.get(i + 1));
            var l2 = new Line(polygon.get(j), polygon.get((j + 1) <polygonSize ? (j + 1) : 0));
            var cut = new Line();

            var tempCut =Polygon.getCut(l1, l2, square , p1, p2, cut);
            cut=tempCut.cut;


            if(tempCut.value){
                var sqLength = cut.squareLength();
                if(sqLength < minSqLength && Polygon.isSegmentInsidePoly(polygon, cut, i, j))
                {
                    minSqLength = sqLength;
                    poly1 = p1;
                    poly2 = p2;
                    cutLine = cut;
                    minCutLine_exists = 1;
                }
            }
        }
    }
    if(minCutLine_exists){
        poly1.push_back(cutLine.getStart());
        poly1.push_back(cutLine.getEnd());

        poly2.push_back(cutLine.getEnd());
        poly2.push_back(cutLine.getStart());

        return {"value":1, "poly1":poly1, "poly2":poly2, "cutLine":cutLine};
    }
    else
    {
        poly1 = new Polygon(polygon);
        return {"value":0, "poly1":poly1, "poly2":poly2, "cutLine":cutLine};
    }

};

Polygon.prototype.findDistance = function(point){
    if(typeof point === 'undefined'){
        throw new Error("param point was undefined");
    }
    if(!point instanceof Vector){
        throw new Error("param point was not Vector Type");
    }

    var distance = Number.MAX_VALUE;

    for(var i = 0, cnt = Math.round(this.poly.size() - 1); i<cnt; i++){
        var line = new Line ();
        line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
        var p =line.getSegmentNearestPoint(point);
        var l = p.subtraction(point).length();
        if( l < distance)
            distance = l;
    }
    var line = new Line ();
    line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = (p.subtraction(point)).length();
    if(l < distance)
        distance = l;
    return distance;
};

Polygon.prototype.findNearestPoint = function (point){
    if(typeof point === 'undefined'){
        throw new Error("param point was undefined");
    }
    if(!point instanceof Vector){
        throw new Error("param point was not Vector Type");
    }
    var result = null;//Vector type
    var distance = Number.MAX_VALUE;

    for(var i = 0, cnt = Math.round(this.poly.size() - 1); i<cnt; i++){
        var line = new Line ()
        line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
        var p = line.getSegmentNearestPoint(point);
        var l = p.subtraction(point).length();
        if( l < distance)
        {
            distance = l;
            result = p;
        }
    }
    var line = new Line ();
    line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = (p.subtraction(point)).length();
    if(l < distance) {
        distance = l;
        result = p;
    }
    distance;//just remove warning
    return result;
};

Polygon.prototype.countCenter = function (){
    return Polygon.polygonCentroid(this.poly);
};

/**
 * point와 가장 가까운 에지에 버텍스 추가
 * @param point
 */
Polygon.prototype.splitNearestEdge = function ( point ){
    if(typeof point === 'undefined') throw new Error("param point was undefined");
    if(!point instanceof Vector) throw new Error("param point was not Vector Type");

    var result;
    var ri = -1;
    var distance = Number.MAX_VALUE;

    for(var i = 0, cnt = this.poly.size() - 1; i<cnt; i++){
        var line = new Line (this.poly.get(i), this.poly.get(i + 1));
        var p = line.getSegmentNearestPoint(point);
        var l = p.subtraction(point).length();
        if(l < distance)
        {
            distance = l;
            ri = i;
            result = p;
        }
    }
    var line = new Line(this.poly.get(this.poly.size() - 1), this.poly.get(0));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if(l < distance)
    {
        distance = l;
        ri = this.poly.size() - 1;
        result = p;
    }

    if(ri != -1)
    {
        this.poly.insert(ri+1,result);
    }

};

Polygon.prototype.isPointInside = function(point){
    if(typeof point === 'undefined')throw new Error("param point was undefined");
    if(!point instanceof Vector)throw new Error("param point was not Vector Type");

    return Polygon.isPointInsidePoly(this.poly,  point);
};

Polygon.prototype.isClockwise = function (){
    var sum = 0;
    var t = Math.round(this.poly.size() -1);
    for(var i = 0; i< t; i++){
        sum += ( this.poly.get(i + 1).x - this.poly.get(i).x ) * ( this.poly.get(i + 1).y + this.poly.get(i).y );
    }
    sum += ( this.poly.get(0).x - this.poly.get(t).x ) * ( this.poly.get(0).y + this.poly.get(t).y );
    return sum<=0;
};

Polygon.prototype.getVectors = function(){
    return this.poly;
};

Polygon.prototype.push_back = function (v){
    if( typeof v !=='undefined' && v instanceof Vector)
        this.poly.push_back(v);
};

Polygon.prototype.empty = function(){
    return this.poly.empty();
};

Polygon.prototype.get = function (idx){
    if (typeof idx !== 'number') throw new Error("param idx was not number type");
    if( this.poly.size()<idx) throw  new Error("param idx was bigger then Vectors size");
    return this.poly.get(idx);
};

Polygon.prototype.setPolygon =function(p){
    if(p instanceof Polygon){
        this.poly = p.poly;
        return this;
    }
};

Polygon.prototype.clear = function(){
    this.poly.clear();
};

Polygon.prototype.size = function(){
    return this.poly.size();
};

/**
 *
 * @param l1 {Line}
 * @param l2 {Line}
 * @param res {Polygons}
 * @returns {Polygons}
 */
Polygon.createPolygons = function( l1, l2, res){
    if(!l1 instanceof Line)throw new Error("param l1 was not Line type");
    if(!l2 instanceof Line)throw new Error("param l2 was not Line type");
    if(!res instanceof Polygons)throw new Error("param res was not Polygons type");

    res.bisector = Line.getBisector(l1,l2).result;
    var v1 = l1.getStart(),
        v2 = l1.getEnd(),
        v3 = l2.getStart(),
        v4 = l2.getEnd();

    res.p1_exist = false;
    res.p4_exist = false;

    if(v1 != v4 ){
        var l1s = new Line(v1, res.bisector.getLineNearestPoint(v1)),
            p1 =new Vector(),
            cls_l1sl2=l1s.crossLineSegment(l2, p1);

        p1 = cls_l1sl2.result;
        res.p1_exist = (cls_l1sl2.value && p1!= v4);
        if(res.p1_exist)
        {
            res.leftTriangle.push_back(v1);
            res.leftTriangle.push_back(v4);
            res.leftTriangle.push_back(p1);

            res.trapezoid.push_back(p1);
        }
        else
        {
            res.trapezoid.push_back(v4);
        }

        var l2e = new Line(v4, res.bisector.getLineNearestPoint(v4)),
            p4 = new Vector(),
            cls_l2el1 = l2e.crossLineSegment(l1, p4);
        p4 = cls_l2el1.result;
        res.p4_exist = (cls_l2el1.value && p4 != v1);
        if(res.p4_exist)
        {
            res.leftTriangle.push_back(v4);
            res.leftTriangle.push_back(v1);
            res.leftTriangle.push_back(p4);

            res.trapezoid.push_back(p4);
        }
        else
        {
            res.trapezoid.push_back(v1);
        }
    }
    else
    {
        res.trapezoid.push_back(v4);
        res.trapezoid.push_back(v1);
    }

    res.p2_exist = false;
    res.p3_exist = false;
    if(v2 != v3)
    {
        var l2s = new Line(v3, res.bisector.getLineNearestPoint(v3)),
            p3 = new Vector(),
            cls_l2sl1 = l2s.crossLineSegment(l1, p3);
        p3 = cls_l2sl1.result;
        res.p3_exist = (cls_l2sl1.value && p3 != v2);
        if(res.p3_exist)
        {
            res.rightTriangle.push_back(v3);
            res.rightTriangle.push_back(v2);
            res.rightTriangle.push_back(p3);

            res.trapezoid.push_back(p3);
        }
        else
        {
            res.trapezoid.push_back(v2);
        }

        var l1e = new Line(v2, res.bisector.getLineNearestPoint(v2)),
            p2 = new Vector(),
            cls_l1el2 = l1e.crossLineSegment(l2, p2);
        p2 = cls_l1el2.result;
        res.p2_exist = (cls_l1el2.value && p2 != v3);
        if(res.p2_exist)
        {
            res.rightTriangle.push_back(v2);
            res.rightTriangle.push_back(v3);
            res.rightTriangle.push_back(p2);

            res.trapezoid.push_back(p2);
        }
        else
        {
            res.trapezoid.push_back(v3);
        }
    }
    else
    {
        res.trapezoid.push_back(v2);
        res.trapezoid.push_back(v3);
    }

    res.leftTriangleSquare = res.leftTriangle.countSquare();
    res.trapezoidSquare = res.trapezoid.countSquare();
    res.rightTriangleSquare = res.rightTriangle.countSquare();

    res.totalSquare = res.leftTriangleSquare + res.trapezoidSquare + res.rightTriangleSquare;

    return res;
};

/**
 *
 * @param square {number}
 * @param res {Polygons}
 * @param cutLine {Line}
 * @returns {*}
 */
Polygon.findCutLine =function (square, res, cutLine) {
    if(square > res.totalSquare)
    {
        return {"value":false};
    }

    if(!res.leftTriangle.empty() && square < res.leftTriangleSquare)
    {
        var m = square / res.leftTriangleSquare;
        var p = res.leftTriangle.get(1).addition(res.leftTriangle.get(2).subtraction( res.leftTriangle.get(1) ).multiplication(m));
        if(res.p1_exist)
        {
            cutLine = new Line(p, res.leftTriangle.get(0));
            return {"value":true, "res":res, "cutLine":cutLine};
        }
        else if(res.p4_exist)
        {
            cutLine = new Line(res.leftTriangle.get(0), p);
            return {"value":true, "res":res, "cutLine":cutLine};
        }
    }
    else if(res.leftTriangleSquare < square && square < (res.leftTriangleSquare + res.trapezoidSquare))
    {
        var t = new Line (res.trapezoid.get(0), res.trapezoid.get(3));
        var tgA = Line.getTanAngle(t, res.bisector);
        var S = square - res.leftTriangleSquare;
        var m;
        if(Math.abs(tgA) > POLY_SPLIT_EPS)
        {
            var a = new Line(res.trapezoid.get(0), res.trapezoid.get(1)).length();
            var b = new Line(res.trapezoid.get(2), res.trapezoid.get(3)).length();
            var hh = 2.0 * res.trapezoidSquare / (a + b);
            var d = a * a - 4.0 * tgA * S;
            var h = -(-a + Math.sqrt(d)) / (2.0 * tgA);
            m = h / hh;
        }
        else
        {
            m = S / res.trapezoidSquare;
        }
        var p = res.trapezoid.get(0).addition(res.trapezoid.get(3).subtraction(res.trapezoid.get(0) ).multiplication(m));
        var pp = res.trapezoid.get(1).addition(res.trapezoid.get(2).subtraction(res.trapezoid.get(1) ).multiplication(m));

        cutLine = new Line(p, pp);
        return {"value":true, "res":res, "cutLine":cutLine};
    }
    else if(!res.rightTriangle.empty() && square > res.leftTriangleSquare + res.trapezoidSquare)
    {
        var S = square - res.leftTriangleSquare - res.trapezoidSquare;
        var m = S / res.rightTriangleSquare;
        var p = res.rightTriangle.get(2).addition(res.rightTriangle.get(1).subtraction(res.rightTriangle.get(2) ).multiplication(m));
        if(res.p3_exist)
        {
            cutLine = new Line(res.rightTriangle.get(0), p);
            return  {"value":true, "res":res, "cutLine":cutLine};
        }
        else if(res.p2_exist)
        {
            cutLine = new Line(p, res.rightTriangle.get(0));
            return { "value" : true, "res" : res, "cutLine" : cutLine };
        }
    }
    return { "value" :false, "res" : res, "cutLine" : cutLine };
};

Polygon.getCut = function(l1, l2, s, poly1, poly2, cut) {
    if( ! l1 instanceof Line) throw new Error("param l1 was not Line type");
    if( ! l2 instanceof Line) throw new Error("param l2 was not Line type");
    if( ! poly1 instanceof Polygon) throw new Error("param poly1 was not Polygon type");
    if( ! poly2 instanceof Polygon) throw new Error("param poly2 was not Polygon type");
    if( typeof s !=="number") throw new Error("param s was not number type");

    var sn1 = s + poly2.countSquare_signed();
    var sn2 = s + poly1.countSquare_signed();

    if(sn1 > 0)
    {
        var res = new Polygons();
        res =  Polygon.createPolygons(l1, l2, res);

        var findCutLineRes = Polygon.findCutLine(sn1, res, cut),
            cut = findCutLineRes.cutLine;
        if(findCutLineRes.value)
        {
            return {"value":true, "cut":cut};
        }
    }
    else if(sn2 > 0)
    {
        var res = new Polygons();
        res =  Polygon.createPolygons(l2, l1, res);

        var findCutLineRes = Polygon.findCutLine(sn2, res, cut),
            cut= findCutLineRes.cutLine;
        if(findCutLineRes.value)
        {
            cut = cut.reverse();
            return {"value":true, "cut":cut};
        }
    }

    return {"value":false, "cut":cut};

};

/**
 *
 * @param poly {Vectors}
 * @param line1 {number}
 * @param line2 {number}
 * @returns {{poly1: Polygon, poly2: Polygon}}
 */
Polygon.createSubPoly = function (poly , line1, line2, poly1, poly2) {
    if(! poly instanceof Vectors){
        throw new Error("param poly was not Vectors Type");
    }

    poly1 = new Polygon(),
    poly2 = new Polygon();

    var pc1 = line2 - line1;
    for (var i = 1; i<=pc1 ; i++){
        poly1.push_back(poly.get(i + line1));
    }

    var polySize = poly.size();
    var pc2 = polySize - pc1;

    for(var i = 1; i<= pc2; i++){
        poly2.push_back(poly.get((i + line2) % polySize));
    }

    return {"poly1":poly1, "poly2": poly2};
};

Polygon.isPointInsidePoly = function(poly, point) {
    var pointsCount = Math.round(poly.size() - 1);
    var l = Line.directedLine(point, new Vector(0.0, 1e100));
    var result = 0;
    var res;
    var v;
    for(var i = 0; i < pointsCount; i++)
    {
        var line = new Line (poly.get(i), poly.get(i + 1));
        res = l.crossSegmentSegment(line);
        result +=res.value;
    }
    var line = new Line(poly.get(pointsCount), poly.get(0));
    res = l.crossSegmentSegment(line);
    result +=res.value;
    return result % 2 != 0;
};

Polygon.isSegmentInsidePoly = function (poly, l , excludeLine1, excludeLine2) {
    var  pointsCount = poly.size();
    for(var i = 0 ; i < pointsCount; i++){
        if(i != excludeLine1 && i != excludeLine2){
            var p1 = poly.get(i);
            var p2 = poly.get(i + 1 < pointsCount ? i + 1 : 0);
            var p = new Vector(),
                css = new Line(p1, p2).crossSegmentSegment(l, p);
            p = css.result;

            if(css.value){
                if((p1.subtraction(p)).squareLength() > POLY_SPLIT_EPS) {
                    if((p2.subtraction(p)).squareLength() > POLY_SPLIT_EPS) {

                        return 0;
                    }
                }
            }
        }
    }
    return Polygon.isPointInsidePoly(poly, l.getPointAlong(0.5));
};

/**
 * 폴리곤 센트로이드
 * @param points
 * @returns {Vector}
 */
Polygon.polygonCentroid = function (points){
    var n = points.size();
    var result = new Vector(0,0,0);
    for(var i =0;i<n;i++)
        result = result.addition(points.get(i));
    result = result.division(n);
    return result;
};

var Polygons = function(){
    this.bisector=new Line();

    this.leftTriangle = new Polygon();
    this.trapezoid = new Polygon();
    this.rightTriangle = new Polygon();

    this.p1_exist=false;
    this.p2_exist=false;
    this.p3_exist=false;
    this.p4_exist=false;

    this.leftTriangleSquare=0;
    this.trapezoidSquare=0;
    this.rightTriangleSquare=0;
    this.totalSquare=0;
};
},{}],3:[function(require,module,exports){
/**
 * Created by jyp on 2016-05-16.
 */

/**
 *
 * @param x
 * @param y
 * @param z
 * @constructor
 */
function Vector (x, y, z){
    if (typeof x !== 'number'){x=0.0;}
    if (typeof y !== 'number'){y=0.0;}
    if (typeof z !== 'number'){z=0.0;}
    this.x=x;this.y=y;this.z=z;
}

/**
 * 더하기
 * @param vector
 * @returns {Vector}
 */
Vector.prototype.addition =function (vector){
    if(!vector  instanceof Vector )throw new Error('param vector was not Vector');
        return new Vector(this.x+vector.x, this.y+vector.y, this.z+vector.z);
};

/**
 * 빼기
 * @param vector
 * @returns {Vector}
 */
Vector.prototype.subtraction =function (vector){
    if(!vector  instanceof Vector )throw new Error('param vector was not Vector');
    return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
};

/**
 * 곱하기
 * @param num
 * @returns {Vector}
 */
Vector.prototype.multiplication =function (num){
    if(typeof num !== 'number')throw new Error('param num was not numeric');
    return new Vector(this.x * num, this.y * num, this.z * num);
};

/**
 * 나누기
 * @param num
 * @returns {Vector}
 */
Vector.prototype.division =function (num) {
    if(typeof num !== 'number')throw new Error("param num was not numeric");
    return new Vector(this.x / num, this.y / num, this.z / num);
};

/**
 * 벡터 곱
 * @param v
 * @returns {*}
 */
Vector.prototype.dot = function (v){
    if(!v instanceof Vector) throw new Error('param v was not Vector');
    return (this.x * v.x + this.y * v.y + this.z + v.z);
};

/**
 * 벡터 길이
 * @returns {number}
 */
Vector.prototype.length = function () {
    return Math.sqrt( this.squareLength() );
};

/**
 * 벡터 길이 제곱
 * @returns {number}
 */
Vector.prototype.squareLength = function () {
    return ((this.x * this.x) + (this.y * this.y) + (this.z + this.z));
};

/**
 * 정규화
 * @returns {Vector}
 */
Vector.prototype.norm = function() {
    var l = this.length();
    if(l == 0){return new Vector()}
    else return new Vector( this.x / l, this.y / l, this.z / l);
};

/**
 * 벡터 비교
 * @param v
 * @returns {boolean}
 */
Vector.prototype.equals = function (v) {
    if(! v instanceof Vector) throw new Error('param v was not Vector');
    if (this.x == v.x && this.y == v.y && this.z == v.z) {
        return true;
    } else {
        return false;
    }
};

/**
 * toString()
 * @returns {string}
 */
Vector.prototype.toString = function(){
    return "("+this.x+", " + this.y + ", " + this.z + ")";
};

/**
 * 벡터 배열
 * @constructor
 */
function Vectors (){
    this.arrVector = new Array();
}

Vectors.prototype.clear = function(){
    this.arrVector.clear();
};
/**
 * 벡터 배열에 벡터 추가
 * @param
 */
Vectors.prototype.push_back = function(v){
    if(!v instanceof Vector) throw new Error("param v was not Vector type");
    this.arrVector.push(v);
};

// 벡터 배열의 해당 인덱스의 값 반환
Vectors.prototype.get = function(idx){
    if(typeof idx === 'number' && this.arrVector.length>idx)
        return this.arrVector[idx];
};
/**
 * 벡터 배열의 크기
 * @returns {Number}
 */
Vectors.prototype.size = function(){
    return this.arrVector.length;
};

/**
 * 배열 뒤집기
 */
Vectors.prototype.reverse = function (){
    this.arrVector.reverse();
};

Vectors.prototype.empty = function(){
    return this.arrVector.length===0?true:false;
};

Vectors.prototype.insert = function(index,vector){
    if(!vector instanceof  Vector)throw  new Error("param vector was not Vector type");
    this.arrVector.splice(index,0,vector);
};

},{}]},{},[2,1,3]);
