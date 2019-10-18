import jsTPS_Unit_Tests from '../test_beds/jsTPS_Unit_Tests'

class TestBedScreen {

    runTests() {
        document.write('Running tests on jsTPS...');
        document.write('Test (1/6): Testing add function...');
        jsTPS_Unit_Tests.testAdd();
        document.write('Test passed.');

        document.write('Test (2/6): Testing andMask function...');
        jsTPS_Unit_Tests.testAndMask();
        document.write('Test passed.');

        document.write('Test (3/6): Testing orMask function...');
        jsTPS_Unit_Tests.testOrMask();
        document.write('Test passed.');

        document.write('Test (4/6): Testing undoTransaction function...');
        jsTPS_Unit_Tests.testUndo();
        document.write('Test passed.');

        document.write('Test (5/6): Testing redoTransaction function...');
        jsTPS_Unit_Tests.testRedo();
        document.write('Test passed.');

        document.write('Test (6/6): Testing clearAllTransactions function...');
        jsTPS_Unit_Tests.testClear();
        document.write('Test passed.');
        document.write('All tests on jsTPS passed.');
    }

    render() {
        <div>
            <p>
                {this.runTests()};
            </p>
            <p>Click 'Back' to exit test bed.</p>
            <button onClick={this.props.goTestHome}>Back</button>
        </div>
    }
}

export default TestBedScreen;