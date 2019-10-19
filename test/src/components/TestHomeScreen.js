import React, { Component } from 'react';

class TestHomeScreen extends Component {

    render() {
        return(
            <div>
                <p>Click on one of the buttons to begin test.</p>
                <div>
                    <button onClick={this.props.goTestBed}>Test Bed</button>
                    <button onClick={this.props.goTester}>Test Program</button>
                </div>
            </div>
        )
    }
}

export default TestHomeScreen;