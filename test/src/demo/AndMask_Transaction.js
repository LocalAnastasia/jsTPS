import jsTPS_Transaction from '../jsTPS/jsTPS_Transaction'

class AndMask_Transaction extends jsTPS_Transaction {
    constructor(num, initNum, mask) {
        super();
        this.num = num;
        this.initNum = initNum;
        this.mask = mask;
    }

    doTransaction() {
        this.num.andMask(this.mask);
    }

    undoTransaction() {
        this.num.setNum(this.initNum);
    }

    toString() {
        return "And Mask " + this.mask;
    }
}

export default AndMask_Transaction;