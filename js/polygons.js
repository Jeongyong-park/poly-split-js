import Polygon from './polygon';
import Line from './line';

class Polygons {
    bisector = new Line();

    leftTriangle = new Polygon();
    trapezoid = new Polygon();
    rightTriangle = new Polygon();

    p1_exist = false;
    p2_exist = false;
    p3_exist = false;
    p4_exist = false;

    leftTriangleSquare = 0;
    trapezoidSquare = 0;
    rightTriangleSquare = 0;
    totalSquare = 0;
}

export default Polygons;