import jsTPS_Transaction from '.../src/jsTPS/jsTPS_Transaction'
import Num from './Num'

class OrMask_Transaction extends jsTPS_Transaction {
    constructor(num, initNum, mask) {
        this.num = num;
        this.initNum = initNum;
        this.mask = mask;
    }

    doTransaction() {
        this.num.orMask(mask);
    }

    undoTransaction() {
        this.num.setNum(this.initNum);
    }

    toString() {
        return "Or Mask " + this.mask;
    }
}