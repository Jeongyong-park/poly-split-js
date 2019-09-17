/**
 * Created by jyp on 2016-05-16.
 */

class Vector {

  /**
   * constructor
   * @param {number} x 
   * @param {number} y 
   * @param {number} z 
   */
  constructor(x, y, z) {
    if (typeof x !== 'number') {
      x = 0.0;
    }
    if (typeof y !== 'number') {
      y = 0.0;
    }
    if (typeof z !== 'number') {
      z = 0.0;
    }
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @param vector
   * @returns {Vector}
   */
  addition = vector => {
    if (!vector instanceof Vector)
      throw new Error('param vector was not Vector');
    return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  subtraction = vector => {
    if (!vector instanceof Vector)
      throw new Error('param vector was not Vector');
    return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  }

  multiplication = num => {
    if (typeof num !== 'number')
      throw new Error('param num was not numeric');
    return new Vector(this.x * num, this.y * num, this.z * num);
  }

  division = num => {
    if (typeof num !== 'number')
      throw new Error("param num was not numeric");
    return new Vector(this.x / num, this.y / num, this.z / num);
  }


  dot = v => {
    if (!v instanceof Vector)
      throw new Error('param v was not Vector');
    return (this.x * v.x + this.y * v.y + this.z + v.z);
  }

  length = () => {
    return Math.sqrt(this.squareLength());
  }

  squareLength = () => {
    return ((this.x * this.x) + (this.y * this.y) + (this.z + this.z));
  }

  /**
   * normalize
   */
  norm = () => {
    var l = this.length();
    if (l == 0) {
      return new Vector()
    } else return new Vector(this.x / l, this.y / l, this.z / l);
  }

  equals = v => {
    if (!v instanceof Vector)
      throw new Error('param v was not Vector');
    if (this.x == v.x && this.y == v.y && this.z == v.z) {
      return true;
    } else {
      return false;
    }
  }

  toString = () => {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
  }
}
export default Vector;