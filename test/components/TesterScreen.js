import jsTPS from '../src/jsTPS/jsTPS'
import jsTPS_Unit_Tests from './test_beds/jsTPS_Unit_Tests'
import Num from './demo/Num'
import AddToNum_Transaction from './demo/AddToNum_Transaction'
import AndMask_Transaction from './demo/AndMask_Transaction'
import OrMask_Transction from './demo/OrMask_Transaction'

class TesterScreen {

    constructor() {
        this.tps = new jsTPS();
        this.state = {
            num: new Num(),
            addValue: 0,
            andValue: 0,
            orValue: 0
        }
    }

    printStates() {
        // PRINT JSTPS
        document.write('CURRENT jsTPS: ');
        document.write(this.tps);
        document.write('');
        
        // PRINT NUM
        document.write('CURRENT Num: ');
        document.write(this.num.getNum());
    }

    createNewNum(num) {
        var newNum = new Num(num.num);
        return newNum;
    }

    setAddValue(e) {
        let val = e.target.value;
        this.setState({addValue: val});
    }

    setAndValue(e) {
        let val = e.target.value;
        this.setState({andValue: val});  
    }

    setOrValue(e) {
        let val = e.target.value;
        this.setState({orValue: val});
    }

    addToNum() {
        var newNum = this.createNewNum(JSON.parse(JSON.stringify(this.state.num)));
        this.tps.addTransaction(new AddToNum_Transaction(newNum, this.state.addValue));
        this.setState({num: newNum});
    }

    andMaskNum() {
        var newNum = this.createNewNum(JSON.parse(JSON.stringify(this.state.num)));
        this.tps.addTransaction(new AndMask_Transaction(newNum, this.state.andValue));
        this.setState({num: newNum});    
    }

    orMaskNum() {
        var newNum = this.createNewNum(JSON.parse(JSON.stringify(this.state.num)));
        this.tps.addTransaction(new OrMask_Transaction(newNum, this.state.orValue));
        this.setState({num: newNum});     
    }
    
    undoTransaction() {
        let transaction = this.tps.peekUndo();
        if (transaction) {
            this.tps.undoTransaction();
            this.setState({num: transaction.initNum});
        }
    }

    redoTransaction() {
        let transaction = this.tps.peekDo();
        if (transaction) {
            this.tps.doTransaction();
            this.setState({num: transaction.initNum});
        }
    }

    clearAllTransactions() {
        this.tps.clearAllTransactions();
        this.forceUpdate();
    }

    reset() {
        this.tps = new jsTPS();
        this.setState({num: new Num()});
    }



    render() {
        <p>{this.printStates()}</p>
        <p>Pick a transaction: </p>
        <div>
            <div>
                <input type='text' onChange={this.setAddValue}>Value: </input>
                <button onClick={this.addToNum}>Add To Num</button>
            </div>
            <div>
                <input type='text' onChange={this.setAndValue}>Value: </input>
                <button onClick={this.andMaskNum}>And Mask Num</button>
            </div>
            <div>
                <input type='text' onChange={this.setOrValue}>Value: </input>
                <button onClick={this.orMaskNum}>Or Mask Num</button>
            </div>
            <button>Undo Most Recent Transaction</button>
            <button>Redo Most Recent Transaction</button>
            <button>Clear All Transactions</button>
            <button>Reset jsTPS and Num</button>
        </div>
        <button onClick={this.props.goTestHome}>Back</button>
    }
}