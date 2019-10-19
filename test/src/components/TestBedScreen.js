import React, { Component } from 'react'
import jsTPS_Unit_Tests from '../test_beds/jsTPS_Unit_Tests'

class TestBedScreen extends Component {

    runTests() {
        let tests = new jsTPS_Unit_Tests();
        const testScript = 
            <ul>
                <p>'Running tests on jsTPS...'</p>
                <p>Test (1/6): Testing add function...'</p>
                <script>{tests.testAdd()}</script>
                <p>'Test passed.'</p>
                <p>'Running tests on jsTPS...'</p>
                <p>Test (2/6): Testing andMask function...'</p>
                <script>{tests.testAndMask()}</script>
                <p>'Test passed.'</p>
                <p>'Running tests on jsTPS...'</p>
                <p>Test (3/6): Testing orMask function...'</p>
                <script>{tests.testOrMask()}</script>
                <p>'Test passed.'</p>
                <p>'Running tests on jsTPS...'</p>
                <p>Test (4/6): Testing undoTransaction function...'</p>
                <script>{tests.testUndo()}</script>
                <p>'Test passed.'</p>
                <p>'Running tests on jsTPS...'</p>
                <p>Test (5/6): Testing redoTransaction function...'</p>
                <script>{tests.testRedo()}</script>
                <p>'Test passed.'</p>
                <p>'Running tests on jsTPS...'</p>
                <p>Test (6/6): Testing clearAllTransactions function...'</p>
                <script>{tests.testClear()}</script>
                <p>'Test passed.'</p>
            </ul>

        return testScript;
    }

    render() {
        return (
            <div>
                <div>
                    {this.runTests()}
                </div>
                <div>
                    <p>Click 'Back' to exit test bed.</p>
                    <button onClick={this.props.goTestHome}>Back</button>
                </div>
            </div>
        )
    }
}

export default TestBedScreen;