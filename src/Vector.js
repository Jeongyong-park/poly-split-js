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
export default class Vector {
  constructor(x, y, z) {
    this.x = x, this.y = y, this.z = z;
  }
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
  };

  division = num => {
    if (typeof num !== 'number')
      throw new Error("param num was not numeric");
    return new Vector(this.x / num, this.y / num, this.z / num);
  }

  dot = vector => {
    if (!vector instanceof Vector)
      throw new Error('param v was not Vector');
    return (this.x * vector.x + this.y * vector.y + this.z + vector.z);
  }

  length = () => {
    return Math.sqrt(this.squareLength());
  }

  squareLength = () => {
    return ((this.x * this.x) + (this.y * this.y) + (this.z + this.z));
  }

  norm = () => {
    var l = this.length();
    if (l == 0) {
      return new Vector()
    } else {
      return new Vector(this.x / l, this.y / l, this.z / l);
    }
  }

  equals = vector => {
    if (!vector instanceof Vector)
      throw new Error('param v was not Vector');
    if (this.x == vector.x && this.y == vector.y && this.z == vector.z) {
      return true;
    } else {
      return false;
    }
  }

  toString = () => {
    return `vector(${this.x}, ${this.y}, ${this.z})`;
  }
}
