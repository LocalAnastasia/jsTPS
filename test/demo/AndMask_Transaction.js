import jsTPS_Transaction from '.../src/jsTPS/jsTPS_Transaction'

class AndMask_Transaction extends jsTPS_Transaction {
    constructor(num, initNum, mask) {
        this.num = num;
        this.initNum = initNum;
        this.mask = mask;
    }

    doTransaction() {
        this.num.andMask(mask);
    }

    undoTransaction() {
        this.num.setNum(this.initNum);
    }

    toString() {
        return "And Mask " + this.mask;
    }
}