import React, { Component } from 'react'
import TestBedScreen from './components/TestBedScreen'
import TesterScreen from './components/TesterScreen'
import TestHomeScreen from './components/TestHomeScreen'
import jsTPS from './jsTPS/jsTPS'

const Screen = {
    TEST_BED_SCREEN: "TEST_BED_SCREEN",
    TESTER_SCREEN: "TESTER_SCREEN",
    TEST_HOME_SCREEN: "TEST_HOME_SCREEN"
  }

class Tester extends Component {

    constructor() {
        super();
        this.tps = new jsTPS();
    }

    state = {
        currentScreen: Screen.TEST_HOME_SCREEN
    }

    goTestHome() {
        this.setState({currentScreen: Screen.TEST_HOME_SCREEN});
    }

    goTestBed() {
        this.setState({currentScreen: Screen.TEST_BED_SCREEN});
    }

    goTester() {
        this.setState({currentScreen: Screen.TESTER_SCREEN});
    }

    render() {
        switch(this.state.currentScreen) {
            case Screen.TEST_BED_SCREEN:
                return <TestBedScreen
                        goTestHome={this.goTestHome.bind(this)}/>;

            case Screen.TESTER_SCREEN:
                return <TesterScreen
                        goTestHome={this.goTestHome.bind(this)}/>;
            
            case Screen.TEST_HOME_SCREEN:
                return <TestHomeScreen
                        goTestBed={this.goTestBed.bind(this)}
                        goTester={this.goTester.bind(this)}/>;
            default:
                return <div>ERROR</div>;
        }
    }
}

export default Tester;