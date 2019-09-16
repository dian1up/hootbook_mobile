import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native'

import Register from './src/screens/Register'

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Register/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 60,
      paddingRight: 60,
      backgroundColor: '#36485f',

    }
})