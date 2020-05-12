class Matrix extends Array {
    constructor() {
        super(...arguments);
    }
    get rank() {
        return Math.sqrt(this.length);
    }
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