import Polygon from './Polygon.js';
import Line from './Line.js';

export default class Polygons {

    constructor() {
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
    }
};