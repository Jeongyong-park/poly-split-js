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