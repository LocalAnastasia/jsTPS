class TestHomeScreen {

    render() {
        <p>Click on one of the buttons to begin test.</p>
        <div>
            <button onClick={this.props.goTestBed}>Test Bed</button>
            <button onClick={this.props.goTester}>Test Program</button>
        </div>
    }
}