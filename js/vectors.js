
class Vectors {


    constructor() {
        this.arrVector = new Array();

        this.clear = this.clear.bind(this);
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

    isEmpty = () => {
        return this.arrVector.length === 0 ? true : false;
    }

    insert = (index, vector) => {
        if (!vector instanceof Vector)
            throw new Error("param vector was not Vector type");
        this.arrVector.splice(index, 0, vector);
    }
}
export default Vectors;