import Vector from './Vector.js';

export default class Vectors {
    constructor() {
        this.arrVector = [];
    }
    clear = () => {
        this.arrVector.clear();
    }

    push_back = v => {
        if (!v instanceof Vector)
            throw new Error("param v was not Vector type");
        this.arrVector.push(v);
    }

    get = idx => {
        if (typeof idx === 'number' && this.arrVector.length > idx)
            return this.arrVector[idx];
    }

    size = () => {
        return this.arrVector.length;
    }

    reverse = () => {
        this.arrVector.reverse();
    }

    empty = () => {
        return this.arrVector.length === 0 ? true : false;
    }

    insert = (index, vector) => {
        if (!vector instanceof Vector)
            throw new Error("param vector was not Vector type");
        this.arrVector.splice(index, 0, vector);
    }
}