class Matrix extends Array {
    constructor() {
        /**
         * Matrix arguments grid
         * example new Matrix(
         * 1, 2, 3,
         * 4, 5, 6,
         * 7, 8, 9
         * );
         */
        super(...arguments);
    }
    /**
     * Returns rank of martix (matrix should be square type)
     */
    get rank() {
        return Math.sqrt(this.length);
    }
    /**
     * Add two matrix
     * @param {Matrix} m 
     */
    Add(m = new Matrix()) {
        let n = m.Clone();
        if (m instanceof Matrix) {
            let length = this.length;
            for (let i = 0; i < length; i++) {
                n[i] = this[i] + m[i];
            }
        }
        return n;
    }
    /**
     * Multiply two matrix
     * @param {Matrix} m 
     */
    Multiply(m = new Matrix()) {
        let t = m.Transponent();
        let res = new Matrix();
        let rank = this.rank;
        let x, j, y = 0;
        for (y; y < rank; y++) {
            for (j = 0; j < rank; j++) {
                let yShift = y * rank;
                res[j + yShift] = this[yShift] * t[j * rank];
                for (x = 1; x < rank; x++) {
                    res[j + yShift] += this[x + yShift] * t[x + j * rank];
                }
            }
        }
        return res;
    }
    /**
     * Returns transponent copy of matrix
     */
    Transponent() {
        let res = this.Clone();
        let rank = this.rank;
        let x, y = 0;
        for (y; y < rank; y++) {
            for (x = 0; x < rank; x++) {
                res[y + x * rank] = this[x + y * rank];
            }
        }
        return res;
    }
    /**
     * Clone matrix
     */
    Clone() {
        let arr = [];
        for (let i = 0; i < this.length; i++) {
            arr[i] = this[i];
        }
        return new Matrix(...arr);
    }
    toString() {
        let s = "";
        let rank = this.rank;
        let length = this.length;
        for (let i = 0; i < length; i++) {
            s+=this[i].toString() + "\t";
            if ((i + 1) % rank == 0) {
                s+="\n";
            }
        }
        return s;
    }
}
class Vector2 {
    /**
     * Create new Vector2
     * @param {Number} x 
     * @param {Number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * Returns new Vector2(-1, 0)
     */
    static get left() {
        return new Vector2(-1, 0);
    }
    /**
     * returns new Vector2(0, 1)
     */
    static get up() {
        return new Vector2(0, 1);
    }
    /**
     * returns new Vector2(1, 0)
     */
    static get right() {
        return new Vector2(1, 0);
    }
    /**
     * returns new Vector2(0, -1)
     */
    static get down() {
        return new Vector2(0, -1);
    }
    /**
     * returns zero vector (0, 0)
     */
    static get zero() {
        return new Vector2(0, 0);
    }
    /**
     * returns angle in radians betwen two vectors
     * @param {Vector2} from 
     * @param {Vector2} to 
     */
    static angle(from = new Vector2(), to = new Vector2()) {
        let a = from.magnitude;
        let b = to.magnitude
        return Math.acos((Math.pow(to.substract(from).magnitude, 2) - Math.pow(a, 2) - Math.pow(b, 2)) / (-2 * a * b));
    }
    /**
     * returns length of vector
     */
    get magnitude() {
        return Math.sqrt(this.dot(this));
    }
    /**
     * returns normalized vector: Vector / Vector.length
     */
    get normalized() {
        return this.divide(this.magnitude);
    }
    /**
     * returns square root from vector's magnitude
     */
    get sqrMagnitude() {
        return Math.sqrt(this.magnitude);
    }
    /**
     * returns negative vector: new Vector2(-v.x, -v.y)
     */
    get negative() {
        return new Vector2(-this.x, -this.y);
    }
    /**
     * returns copy of vector
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
    /**
     * Applys Math method abs to x and y component and return vector
     */
    abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }
    /**
     * Multiply to given vector: this.x * v.x + this.y * v.y
     * @param {Vector2} v 
     */
    dot(v = new Vector2()) {
        if (v instanceof Vector2) {
            return this.x * v.x + this.y * v.y;
        } else {
            throw new Error("Vector2.dot(Vector2) Invalid argument");
        }
    }
    /**
     * returns sum of vectors
     * @param {Vector2} v 
     */
    add(v = new Vector2()) {
        if (v instanceof Vector2) {
            return new Vector2(this.x + v.x, this.y + v.y);
        } else {
            throw new Error("Vector2.add(Vector2) Invalid argument");
        }
    }
    /**
     * returns subraction of vectors
     * @param {Vector2} v 
     */
    substract(v = new Vector2()) {
        if (v instanceof Vector2) {
            return new Vector2(this.x - v.x, this.y - v.y);
        } else {
            throw new Error("Vector2.substract(Vector2) Invalid argument");
        }
    }
    /**
     * Multiply vector by number
     * @param {Number} v 
     */
    multiply(v = 1) {
        if (typeof v == "number") {
            return new Vector2(this.x * v, this.y * v);
        } else {
            throw new Error("Vector2.multiply(number) Invalid argument");
        }
    }
    /**
     * Divide vector by a number
     * @param {Number} v 
     */
    divide(v = new Vector2()) {
        if (typeof v == "number") {
            return new Vector2(this.x / v, this.y / v);
        } else {
            throw new Error("Vector2.divide(number) Invalid argument");
        }
    }
    /**
     * returns true if vectors are equal and false if don't
     * @param {Vector2} v 
     */
    equals(v = new Vector2()) {
        if (v instanceof Vector2) {
            return this.x == v.x && this.y == v.y;
        } else {
            throw new Error("Vector2.equals(Vector2) Invalid argument");
        }
    }
}

class LinkedList {
    constructor() {
        if (arguments.length == 0) {
            this.value = null;
            this.next = null;
        }
        let a = this;
        a.first = this;
        for (let index in arguments) {
            a.value = arguments[index];
            a.next = new LinkedList();
            a.first = this;
            let p = a;
            a = a.next;
            a.prev = p;
        }
    }
    get length() {
        let a = this;
        let i = 0;
        while(a != null) {
            i++;
            a = a.next;
        }
        return i - 1;
    }
    GetByIndex(i) {
        let a = this;
        for(let j = 0; j < i; j++) {
            a = a.next;
        }
        return a;
    }
    Remove(i) {
        let target = this.GetByIndex(i);
        target.prev.next = target.next;
    }
    Delete() {
        if (this.prev && this.next) {
            this.prev.next = this.next;
            return;
        } else if (this.prev) {
            this.prev.next = new LinkedList();
            return;
        } else if (this.next) {
            this.value = this.next.value;
            this.next = this.next.next;
        } else {
            this.value = null;
        }
        
    }
    Insert(i, value) {
        let target = this.GetByIndex(i);
        let ins =  new LinkedList();
        ins.value = value;
        ins.next = target;
        target.prev.next = ins;
    }
    Append(value) {
        let ins = new LinkedList();
        ins.value = value;
        ins.first = this;
        ins.next = new LinkedList();
        this.GetByIndex(this.length - 1).next = ins;
    }
    Preppend(value) {
        let ins = new LinkedList();
        ins.value = this.value;
        ins.next = this.next;
        this.value = value;
        this.next = ins;
        ins.first = this;
    }
    ForEach(cb) {
        for(let i = 0; i < this.length; i++) {
            cb(this.GetByIndex(i));
        }
    }
    ForEachValue(cb) {
        for(let i = 0; i < this.length; i++) {
            cb(this.GetByIndex(i).value);
        }
    }
}

class BinaryTree {
    constructor(data = []) {
        if (data.length < 1) {
            this.value = undefined;
            return;
        }
        let i = Math.floor((data.length - 1) / 2);
        this.value = data[i];
        this.parent = undefined;
        this.leftBranch = new BinaryTree(data.slice(0, i));
        this.leftBranch.parent = this;
        this.rightBranch = new BinaryTree(data.slice(i + 1, data.length));
        this.rightBranch.parent = this;
    }
    get EmptyBranch() {
        return new BinaryTree([]);
    }
    Append(value) {
        if (value > this.value) {
            if (this.rightBranch.value !== undefined) {
                this.rightBranch.Append(value);
            } else {
                this.rightBranch = new BinaryTree([value]);                
                this.rightBranch.parent = this;
            }
            
        } else if (value < this.value) {
            if (this.leftBranch.value !== undefined) {
                this.leftBranch.Append(value);
            } else {
                this.leftBranch = new BinaryTree([value]);
                this.leftBranch.parent = this;
            }
        }
    }
    AppendBranch(value = new BinaryTree()) {

    }
    Search(val) {
        if (val == this.value) {
            return this;
        } else if (val > this.value) {
            return this.rightBranch.Search(val);
        } else if (val < this.value) {
            return this.leftBranch.Search(val);
        }
        return false;
    }
    Min() {
        let link = this;
        while(!isNaN(link.value)) {
            link = link.leftBranch;
        }
        return link.parent;
    }
    Delete(val) {
        let node = this.Search(val);
        if (node.rightBranch.value === undefined) {
            if (node.leftBranch.value !== undefined) {
                node.value = node.leftBranch.value;
                let save = node.leftBranch.rightBranch;
                if (node.leftBranch.leftBranch.value !== undefined) {
                    node.leftBranch = node.leftBranch.leftBranch;
                }
                if (node.leftBranch.rightBranch.value !== undefined) {
                    node.rightBranch = save;
                }
            } else {
                node.value = undefined;
            }
            return;
        }
        let toReplace = node.rightBranch.Min(); 
        node.value = toReplace.value;
            toReplace.value = toReplace.rightBranch.value;
            if (toReplace.rightBranch.value != undefined) {
                toReplace.rightBranch = toReplace.rightBranch.rightBranch;
            }
    }
    toString() {
        let left = this.leftBranch.value !== undefined ? this.leftBranch.toString() : "";
        let right = this.rightBranch.value !== undefined ? this.rightBranch.toString() : "";        
        let res = `${this.value} [L ${left}, R ${right}]`;
        return res;
    }
}
