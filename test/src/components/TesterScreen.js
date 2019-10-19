import React, { Component } from 'react';
import jsTPS from '../jsTPS/jsTPS'
import Num from '../demo/Num'
import AddToNum_Transaction from '../demo/AddToNum_Transaction'
import AndMask_Transaction from '../demo/AndMask_Transaction'
import OrMask_Transaction from '../demo/OrMask_Transaction'

class TesterScreen extends Component{

    constructor() {
        super();
        this.tps = new jsTPS();
    }

    state = {
        num: new Num(),
        addValue: 0,
        andValue: 0,
        orValue: 0
    }
    printStates = () => {
        const testScript = 
            <div>
                <p>'CURRENT jsTPS: </p>
                <p>{this.tps.toString()}</p>
                <br></br>
                <p>CURRENT Num: </p>
                <p>{this.state.num.getNum()}</p>
            </div>
        
        return testScript;
    }

    createNewNum(num) {
        var newNum = new Num();
        newNum.setNum(num.num);
        return newNum;
    }

    setAddValue = (e) => {
        let val = parseInt(e.target.value);
        this.setState({addValue: val});
    }

    setAndValue = (e) => {
        let val = parseInt(e.target.value);
        this.setState({andValue: val});  
    }

    setOrValue = (e) => {
        let val = parseInt(e.target.value);
        this.setState({orValue: val});
    }

    addToNum = () => {
        var newNum = this.createNewNum(JSON.parse(JSON.stringify(this.state.num)));
        this.tps.addTransaction(new AddToNum_Transaction(newNum, this.state.addValue));
        this.setState({num: newNum, addValue: 0});
    }

    andMaskNum = () => {
        var newNum = this.createNewNum(JSON.parse(JSON.stringify(this.state.num)));
        this.tps.addTransaction(new AndMask_Transaction(newNum, newNum.getNum(), this.state.andValue));
        this.setState({num: newNum, andValue: 0});    
    }

    orMaskNum = () => {
        var newNum = this.createNewNum(JSON.parse(JSON.stringify(this.state.num)));
        this.tps.addTransaction(new OrMask_Transaction(newNum, newNum.getNum(), this.state.orValue));
        this.setState({num: newNum, orValue: 0});     
    }
    
    undoTransaction = () => {
        let transaction = this.tps.peekUndo();
        if (transaction) {
            this.tps.undoTransaction();
            var newNum = this.createNewNum(JSON.parse(JSON.stringify(transaction.num)));
            this.setState({num: newNum});
        }
    }

    redoTransaction = () => {
        let transaction = this.tps.peekDo();
        if (transaction) {
            this.tps.doTransaction();
            var newNum = this.createNewNum(JSON.parse(JSON.stringify(transaction.num)));
            this.setState({num: newNum});
        }
    }

    clearAllTransactions = () => {
        this.tps.clearAllTransactions();
        this.forceUpdate();
    }

    reset = () => {
        this.tps = new jsTPS();
        this.setState({num: new Num()});
    }

    render() {
        return(
            <div>
                <div>{this.printStates()}</div>
                <p>Pick a transaction:</p>
                <div>
                    <div>
                        <span>Value: </span>
                        <input value={this.state.addValue} type='number' onChange={this.setAddValue}/>
                        <button onClick={this.addToNum}>Add To Num</button>
                    </div>
                    <div>
                        <span>Value: </span>
                        <input value={this.state.andValue} type='number' onChange={this.setAndValue}/>
                        <button onClick={this.andMaskNum}>And Mask Num</button>
                    </div>
                    <div>
                        <span>Value: </span>
                        <input value={this.state.orValue} type='number' onChange={this.setOrValue}/>
                        <button onClick={this.orMaskNum}>Or Mask Num</button>
                    </div>
                    <div>
                        <button onClick={this.undoTransaction}>Undo Most Recent Transaction</button>
                    </div>
                    <div>
                        <button onClick={this.redoTransaction}>Redo Most Recent Transaction</button>
                    </div>
                    <div>
                        <button onClick={this.clearAllTransactions}>Clear All Transactions</button>
                    </div>
                    <div>
                        <button onClick={this.reset}>Reset jsTPS and Num</button>
                    </div>
                </div>
                <button onClick={this.props.goTestHome}>Back</button>
            </div>
        )
    }
}

export default TesterScreen;