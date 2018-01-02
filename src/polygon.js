/**
 * Created by jyp on 2016-05-16.
 */

/**
 *
 * @param v {Vectors=}
 * @constructor
 */
const V = require('./vector.js');
const Vector = V.Vector;
const Vectors = V.Vectors;
const Line = require('./line.js');
const POLY_SPLIT_EPS = 1E-6;
function Polygon(v) {
  if (typeof v === 'undefined') {
    v = new Vectors();
  } else if (!v instanceof Vectors) {
    throw new Error("param v was not Vector Type");
  }
  this.poly = v;
}

Polygon.prototype.countSquare = function() {
  var t = this.countSquare_signed();
  if (typeof t === 'number')
    return t < 0 ? t * -1 : t; //절대 값
};

Polygon.prototype.countSquare_signed = function() {
  var pointsCount = this.poly.size();
  if (pointsCount < 3) {
    return 0;
  }

  var result = 0.0;
  for (var i = 0; i < pointsCount; i++) {
    if (i == 0)
      result += this.poly.get(i).x * (this.poly.get(pointsCount - 1).y - this.poly.get(i + 1).y);
    else if (i == pointsCount - 1)
      result += this.poly.get(i).x * (this.poly.get(i - 1).y - this.poly.get(0).y);
    else
      result += this.poly.get(i).x * (this.poly.get(i - 1).y - this.poly.get(i + 1).y);
  }
  return result / 2.0;
};

//Polygon.prototype.split =function(square, poly1, poly2, cutLine){


Polygon.prototype.split = function(square, cutLine) {
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

  if (this.countSquare() - square <= POLY_SPLIT_EPS) {
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

      var l1 = new Line(polygon.get(i), polygon.get(i + 1));
      var l2 = new Line(polygon.get(j), polygon.get((j + 1) < polygonSize ? (j + 1) : 0));
      var cut = new Line();

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

Polygon.prototype.findDistance = function(point) {
  if (typeof point === 'undefined') {
    throw new Error("param point was undefined");
  }
  if (!point instanceof Vector) {
    throw new Error("param point was not Vector Type");
  }

  var distance = Number.MAX_VALUE;

  for (var i = 0, cnt = Math.round(this.poly.size() - 1); i < cnt; i++) {
    var line = new Line();
    line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance)
      distance = l;
  }
  var line = new Line();
  line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
  var p = line.getSegmentNearestPoint(point);
  var l = (p.subtraction(point)).length();
  if (l < distance)
    distance = l;
  return distance;
};

Polygon.prototype.findNearestPoint = function(point) {
  if (typeof point === 'undefined') {
    throw new Error("param point was undefined");
  }
  if (!point instanceof Vector) {
    throw new Error("param point was not Vector Type");
  }
  var result = null; //Vector type
  var distance = Number.MAX_VALUE;

  for (var i = 0, cnt = Math.round(this.poly.size() - 1); i < cnt; i++) {
    var line = new Line()
    line.initFromVector(this.poly.get(i), this.poly.get(i + 1));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance) {
      distance = l;
      result = p;
    }
  }
  var line = new Line();
  line.initFromVector(this.poly.get(this.poly.size() - 1), this.poly.get(0));
  var p = line.getSegmentNearestPoint(point);
  var l = (p.subtraction(point)).length();
  if (l < distance) {
    distance = l;
    result = p;
  }
  distance; //just remove warning
  return result;
};

Polygon.prototype.countCenter = function() {
  return Polygon.polygonCentroid(this.poly);
};

/**
 * point와 가장 가까운 에지에 버텍스 추가
 * @param point
 */
Polygon.prototype.splitNearestEdge = function(point) {
  if (typeof point === 'undefined')
    throw new Error("param point was undefined");
  if (!point instanceof Vector)
    throw new Error("param point was not Vector Type");

  var result;
  var ri = -1;
  var distance = Number.MAX_VALUE;

  for (var i = 0, cnt = this.poly.size() - 1; i < cnt; i++) {
    var line = new Line(this.poly.get(i), this.poly.get(i + 1));
    var p = line.getSegmentNearestPoint(point);
    var l = p.subtraction(point).length();
    if (l < distance) {
      distance = l;
      ri = i;
      result = p;
    }
  }
  var line = new Line(this.poly.get(this.poly.size() - 1), this.poly.get(0));
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

Polygon.prototype.isPointInside = function(point) {
  if (typeof point === 'undefined')
    throw new Error("param point was undefined");
  if (!point instanceof Vector)
    throw new Error("param point was not Vector Type");

  return Polygon.isPointInsidePoly(this.poly, point);
};

Polygon.prototype.isClockwise = function() {
  var sum = 0;
  var t = Math.round(this.poly.size() - 1);
  for (var i = 0; i < t; i++) {
    sum += (this.poly.get(i + 1).x - this.poly.get(i).x) * (this.poly.get(i + 1).y + this.poly.get(i).y);
  }
  sum += (this.poly.get(0).x - this.poly.get(t).x) * (this.poly.get(0).y + this.poly.get(t).y);
  return sum <= 0;
};

Polygon.prototype.getVectors = function() {
  return this.poly;
};

Polygon.prototype.push_back = function(v) {
  if (typeof v !== 'undefined' && v instanceof Vector)
    this.poly.push_back(v);
};

Polygon.prototype.empty = function() {
  return this.poly.empty();
};

Polygon.prototype.get = function(idx) {
  if (typeof idx !== 'number')
    throw new Error("param idx was not number type");
  if (this.poly.size() < idx)
    throw new Error("param idx was bigger then Vectors size");
  return this.poly.get(idx);
};

Polygon.prototype.setPolygon = function(p) {
  if (p instanceof Polygon) {
    this.poly = p.poly;
    return this;
  }
};

Polygon.prototype.clear = function() {
  this.poly.clear();
};

Polygon.prototype.size = function() {
  return this.poly.size();
};

/**
 *
 * @param l1 {Line}
 * @param l2 {Line}
 * @param res {Polygons}
 * @returns {Polygons}
 */
Polygon.createPolygons = function(l1, l2, res) {
  if (!l1 instanceof Line)
    throw new Error("param l1 was not Line type");
  if (!l2 instanceof Line)
    throw new Error("param l2 was not Line type");
  if (!res instanceof Polygons)
    throw new Error("param res was not Polygons type");

  res.bisector = Line.getBisector(l1, l2).result;
  var v1 = l1.getStart(),
    v2 = l1.getEnd(),
    v3 = l2.getStart(),
    v4 = l2.getEnd();

  res.p1_exist = false;
  res.p4_exist = false;

  if (v1 != v4) {
    var l1s = new Line(v1, res.bisector.getLineNearestPoint(v1)),
      p1 = new Vector(),
      cls_l1sl2 = l1s.crossLineSegment(l2, p1);

    p1 = cls_l1sl2.result;
    res.p1_exist = (cls_l1sl2.value && p1 != v4);
    if (res.p1_exist) {
      res.leftTriangle.push_back(v1);
      res.leftTriangle.push_back(v4);
      res.leftTriangle.push_back(p1);

      res.trapezoid.push_back(p1);
    } else {
      res.trapezoid.push_back(v4);
    }

    var l2e = new Line(v4, res.bisector.getLineNearestPoint(v4)),
      p4 = new Vector(),
      cls_l2el1 = l2e.crossLineSegment(l1, p4);
    p4 = cls_l2el1.result;
    res.p4_exist = (cls_l2el1.value && p4 != v1);
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
    var l2s = new Line(v3, res.bisector.getLineNearestPoint(v3)),
      p3 = new Vector(),
      cls_l2sl1 = l2s.crossLineSegment(l1, p3);
    p3 = cls_l2sl1.result;
    res.p3_exist = (cls_l2sl1.value && p3 != v2);
    if (res.p3_exist) {
      res.rightTriangle.push_back(v3);
      res.rightTriangle.push_back(v2);
      res.rightTriangle.push_back(p3);

      res.trapezoid.push_back(p3);
    } else {
      res.trapezoid.push_back(v2);
    }

    var l1e = new Line(v2, res.bisector.getLineNearestPoint(v2)),
      p2 = new Vector(),
      cls_l1el2 = l1e.crossLineSegment(l2, p2);
    p2 = cls_l1el2.result;
    res.p2_exist = (cls_l1el2.value && p2 != v3);
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

/**
 *
 * @param square {number}
 * @param res {Polygons}
 * @param cutLine {Line}
 * @returns {*}
 */
Polygon.findCutLine = function(square, res, cutLine) {
  if (square > res.totalSquare) {
    return {
      "value": false
    };
  }

  if (!res.leftTriangle.empty() && square < res.leftTriangleSquare) {
    var m = square / res.leftTriangleSquare;
    var p = res.leftTriangle.get(1).addition(res.leftTriangle.get(2).subtraction(res.leftTriangle.get(1)).multiplication(m));
    if (res.p1_exist) {
      cutLine = new Line(p, res.leftTriangle.get(0));
      return {
        "value": true,
        "res": res,
        "cutLine": cutLine
      };
    } else if (res.p4_exist) {
      cutLine = new Line(res.leftTriangle.get(0), p);
      return {
        "value": true,
        "res": res,
        "cutLine": cutLine
      };
    }
  } else if (res.leftTriangleSquare < square && square < (res.leftTriangleSquare + res.trapezoidSquare)) {
    var t = new Line(res.trapezoid.get(0), res.trapezoid.get(3));
    var tgA = Line.getTanAngle(t, res.bisector);
    var S = square - res.leftTriangleSquare;
    var m;
    if (Math.abs(tgA) > POLY_SPLIT_EPS) {
      var a = new Line(res.trapezoid.get(0), res.trapezoid.get(1)).length();
      var b = new Line(res.trapezoid.get(2), res.trapezoid.get(3)).length();
      var hh = 2.0 * res.trapezoidSquare / (a + b);
      var d = a * a - 4.0 * tgA * S;
      var h = -(-a + Math.sqrt(d)) / (2.0 * tgA);
      m = h / hh;
    } else {
      m = S / res.trapezoidSquare;
    }
    var p = res.trapezoid.get(0).addition(res.trapezoid.get(3).subtraction(res.trapezoid.get(0)).multiplication(m));
    var pp = res.trapezoid.get(1).addition(res.trapezoid.get(2).subtraction(res.trapezoid.get(1)).multiplication(m));

    cutLine = new Line(p, pp);
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
      cutLine = new Line(res.rightTriangle.get(0), p);
      return {
        "value": true,
        "res": res,
        "cutLine": cutLine
      };
    } else if (res.p2_exist) {
      cutLine = new Line(p, res.rightTriangle.get(0));
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

Polygon.getCut = function(l1, l2, s, poly1, poly2, cut) {
  if (!l1 instanceof Line)
    throw new Error("param l1 was not Line type");
  if (!l2 instanceof Line)
    throw new Error("param l2 was not Line type");
  if (!poly1 instanceof Polygon)
    throw new Error("param poly1 was not Polygon type");
  if (!poly2 instanceof Polygon)
    throw new Error("param poly2 was not Polygon type");
  if (typeof s !== "number")
    throw new Error("param s was not number type");

  var sn1 = s + poly2.countSquare_signed();
  var sn2 = s + poly1.countSquare_signed();

  if (sn1 > 0) {
    var res = new Polygons();
    res = Polygon.createPolygons(l1, l2, res);

    var findCutLineRes = Polygon.findCutLine(sn1, res, cut),
      cut = findCutLineRes.cutLine;
    if (findCutLineRes.value) {
      return {
        "value": true,
        "cut": cut
      };
    }
  } else if (sn2 > 0) {
    var res = new Polygons();
    res = Polygon.createPolygons(l2, l1, res);

    var findCutLineRes = Polygon.findCutLine(sn2, res, cut),
      cut = findCutLineRes.cutLine;
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
Polygon.createSubPoly = function(poly, line1, line2, poly1, poly2) {
  if (!poly instanceof Vectors) {
    throw new Error("param poly was not Vectors Type");
  }

  poly1 = new Polygon(),
  poly2 = new Polygon();

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

Polygon.isPointInsidePoly = function(poly, point) {
  var pointsCount = Math.round(poly.size() - 1);
  var l = Line.directedLine(point, new Vector(0.0, 1e100));
  var result = 0;
  var res;
  var v;
  for (var i = 0; i < pointsCount; i++) {
    var line = new Line(poly.get(i), poly.get(i + 1));
    res = l.crossSegmentSegment(line);
    result += res.value;
  }
  var line = new Line(poly.get(pointsCount), poly.get(0));
  res = l.crossSegmentSegment(line);
  result += res.value;
  return result % 2 != 0;
};

Polygon.isSegmentInsidePoly = function(poly, l, excludeLine1, excludeLine2) {
  var pointsCount = poly.size();
  for (var i = 0; i < pointsCount; i++) {
    if (i != excludeLine1 && i != excludeLine2) {
      var p1 = poly.get(i);
      var p2 = poly.get(i + 1 < pointsCount ? i + 1 : 0);
      var p = new Vector(),
        css = new Line(p1, p2).crossSegmentSegment(l, p);
      p = css.result;

      if (css.value) {
        if ((p1.subtraction(p)).squareLength() > POLY_SPLIT_EPS) {
          if ((p2.subtraction(p)).squareLength() > POLY_SPLIT_EPS) {

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
Polygon.polygonCentroid = function(points) {
  var n = points.size();
  var result = new Vector(0, 0, 0);
  for (var i = 0; i < n; i++)
    result = result.addition(points.get(i));
  result = result.division(n);
  return result;
};

var Polygons = function() {
  this.bisector = new Line();

  this.leftTriangle = new Polygon();
  this.trapezoid = new Polygon();
  this.rightTriangle = new Polygon();

  this.p1_exist = false;
  this.p2_exist = false;
  this.p3_exist = false;
  this.p4_exist = false;

  this.leftTriangleSquare = 0;
  this.trapezoidSquare = 0;
  this.rightTriangleSquare = 0;
  this.totalSquare = 0;
};
module.exports = Polygon;