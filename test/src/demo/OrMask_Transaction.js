import jsTPS_Transaction from '../jsTPS/jsTPS_Transaction'

class OrMask_Transaction extends jsTPS_Transaction {
    constructor(num, initNum, mask) {
        super();
        this.num = num;
        this.initNum = initNum;
        this.mask = mask;
    }

    doTransaction() {
        this.num.orMask(this.mask);
    }

    undoTransaction() {
        this.num.setNum(this.initNum);
    }

    toString() {
        return "Or Mask " + this.mask;
    }
}

export default OrMask_Transaction;