import React, { Component } from 'react'
import TestBedScreen from './components/TestBedScreen'
import TesterScreen from './components/TesterScreen'
import TestHomeScreen from './components/TestHomeScreen'

const Screen = {
    TEST_BED_SCREEN: "TEST_BED_SCREEN",
    TESTER_SCREEN: "TESTER_SCREEN",
    TEST_HOME_SCREEN: "TEST_HOME_SCREEN"
  }

class Tester extends Component {

    constructor() {
        super();
        this.tps = new jsTPS();
        this.state = {
            currentScreen: Screen.TEST_HOME_SCREEN
        }
    }

    goTestHome() {
        this.setState({currentScreen: Screen.TEST_HOME_SCREEN})
    }

    goTestBed() {
        this.setState({currentScreen: Screen.TEST_BED_SCREEN})
    }

    goTester() {
        this.setState({currentScreen: Screen.TESTER_SCREEN})
    }

    render() {
        switch(this.state.currentScreen) {
            case TEST_BED_SCREEN:
                return <TestBedScreen
                        goTestHome={this.goTestHome}/>

            case TESTER_SCREEN:
                return <TesterScreen
                        goTestHome={this.goTestHome}/>
            
            case TEST_HOME_SCREEN:
                return <TestHomeScreen
                        goTestBed={this.goTestBed}
                        goTester={this.goTester}/>
        }
    }
}

export default Tester;