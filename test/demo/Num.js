class Num {

    constructor() {
        this.num = 0;
    }

    setNum(initNum) {
        this.num = initNum;
    }

    getNum() {
        return this.num;
    }

    andMask(mask) {
        this.setNum(num & mask);
    }

    orMask(mask) {
        this.setNum(num | mask);
    }
}