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
