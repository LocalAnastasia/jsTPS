import jsTPS_Transaction from '../jsTPS/jsTPS_Transaction'

class AddToNum_Transaction extends jsTPS_Transaction {
    constructor(initNum, initAmountToAdd) {
        super();
        this.num = initNum;
        this.amountToAdd = initAmountToAdd;
    }

    doTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum + this.amountToAdd;
        this.num.setNum(newNum);
    }

    undoTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum - this.amountToAdd;
        this.num.setNum(newNum);
    }

    toString() {
        return "Add " + this.amountToAdd;
    }
}

export default AddToNum_Transaction;