import React, { Component, Fragment } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native'

// import Register from './src/screens/Register'
// import Login from './src/screens/login'
import AppContainer from './src/route/mainNavigator'


export default class App extends Component {
    render() {
        return (
            <Fragment>
                {/* <Login /> */}
                {/* <Register /> */}
                <AppContainer />
            </Fragment>
        )
    }
}