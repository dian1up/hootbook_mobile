import React, { Component, Fragment } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native'

// import ProfileMitra from './src/screens/EditProfileMitra'
import Login from './src/screens/login'
import AppContainer from './src/route/mainNavigator'


export default class App extends Component {
    render() {
        return (
            <Fragment>
                {/* <Login /> */}
                {/* <ProfileMitra /> */}
                <AppContainer />
            </Fragment>
        )
    }
}
